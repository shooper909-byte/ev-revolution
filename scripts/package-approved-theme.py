"""Package a fresh Next build into the existing WordPress theme, preserving its runtime.

Usage: python scripts/package-approved-theme.py --base PATH_TO_LAST_RELEASE_THEME
The output is a new folder; existing releases are never overwritten.
"""
from pathlib import Path
import argparse
import hashlib
import json
import re
import shutil
import zipfile

root = Path(__file__).resolve().parents[1]
args = argparse.ArgumentParser()
args.add_argument('--base', type=Path, required=True)
base = args.parse_args().base.resolve()
build = root / '.next'
assert (build / 'BUILD_ID').is_file(), 'Run a successful next build first'
assert (base / 'functions.php').is_file(), 'Existing theme runtime required'
target = root / 'wordpress-theme/eves-sisters-2.15.0'
assert not target.exists(), 'Refusing to overwrite an existing package'
shutil.copytree(base, target)
shutil.copytree(build / 'static', target / 'assets/next/static', dirs_exist_ok=True)
shutil.copytree(root / 'public/images', target / 'assets/images', dirs_exist_ok=True)
for source, destination in [('src/app/opengraph-image.png', 'opengraph-image.png'), ('src/app/icon.svg', 'site-icon.svg')]:
    if (root / source).is_file(): shutil.copy2(root / source, target / 'assets/images' / destination)

routes = {}
for source in (build / 'server/app').rglob('*.html'):
    relative = source.relative_to(build / 'server/app').as_posix()
    if relative == '_not-found.html': destination = '404.html'
    else: destination = relative.replace('/', '-')
    shutil.copy2(source, target / 'static-pages' / destination)
    routes[relative] = destination
sitemap = build / 'server/app/sitemap.xml.body'
assert sitemap.is_file(), 'Built sitemap required'
shutil.copy2(sitemap, target / 'static-pages/sitemap.xml')
for route in ('gender-affirming-care', 'services', 'resources'):
    assert (target / 'static-pages' / (route + '.html')).is_file()

runtime = (target / 'functions.php').read_text(encoding='utf-8')
runtime = runtime.replace('next-asset-v2140', 'next-asset-v2150')
runtime = runtime.replace("$path === '/next-asset-v2150'", "$path === '/next-asset-v2140' || $path === '/next-asset-v2150'", 1)
marker = "    $pages = array("
assert runtime.count(marker) == 1
runtime = runtime.replace(marker, marker + "\n        'gender-affirming-care' => 'gender-affirming-care.html',\n        'services' => 'services.html',\n        'resources' => 'resources.html',", 1)
runtime += "\nrequire_once __DIR__ . '/early-access.php';\n"
(target / 'functions.php').write_text(runtime, encoding='utf-8')
shutil.copy2(root / 'scripts/pressable/early-access.php', target / 'early-access.php')
style = (target / 'style.css').read_text(encoding='utf-8')
style = re.sub(r'Version: [0-9.]+', 'Version: 2.15.0', style, count=1)
(target / 'style.css').write_text(style, encoding='utf-8')

# Use a versioned folder, matching prior releases and retaining rollback themes.
archive = target.parent / 'eves-sisters-2.15.0-ready.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for file in sorted(target.rglob('*')):
        if file.is_file(): z.write(file, target.name + '/' + file.relative_to(target).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert all(not n.startswith('/') and '..' not in Path(n).parts for n in z.namelist())
    assert target.name + '/early-access.php' in z.namelist()
manifest = {'version': '2.15.0', 'buildId': (build / 'BUILD_ID').read_text().strip(), 'routes': routes, 'sha256': hashlib.sha256(archive.read_bytes()).hexdigest(), 'archive': str(archive)}
(target.parent / 'release-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(json.dumps(manifest, indent=2))
