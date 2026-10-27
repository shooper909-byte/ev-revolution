import { useState } from 'react';

import { AppText, Button, Notice, Screen, TextField } from '@/components/ui';
import { personName, usPhoneOptional, validateForm } from '@/lib/validation';
import { useSession } from '@/state/SessionProvider';

type Field = 'firstName' | 'lastName' | 'preferredName' | 'phone';

/**
 * Profile holds contact details only. Clinical history is collected and kept
 * by the clinical platform, not in this app.
 */
export default function Profile() {
  const { user } = useSession();
  const [values, setValues] = useState<Record<Field, string>>({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    preferredName: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [saved, setSaved] = useState(false);

  const set = (k: Field) => (v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
    setSaved(false);
  };

  const save = () => {
    const next = validateForm(values, {
      firstName: [personName('First name')],
      lastName: [personName('Last name')],
      phone: [usPhoneOptional],
    });
    if (values.preferredName.trim()) {
      const e = personName('Preferred name')(values.preferredName);
      if (e) next.preferredName = e;
    }
    setErrors(next);
    if (Object.keys(next).length === 0) setSaved(true);
  };

  return (
    <Screen footer={<Button label="Save changes" onPress={save} testID="profile-save" />}>
      <Notice tone="demo">Profile changes in this preview are not saved anywhere.</Notice>
      <TextField label="First name" value={values.firstName} onChangeText={set('firstName')} error={errors.firstName} required testID="profile-first" />
      <TextField label="Last name" value={values.lastName} onChangeText={set('lastName')} error={errors.lastName} required />
      <TextField label="Preferred name (optional)" value={values.preferredName} onChangeText={set('preferredName')} error={errors.preferredName} helper="What you’d like your care team to call you." />
      <TextField label="Email" value={user?.email ?? ''} editable={false} helper="Changing your sign-in email requires verification (not available in the demo)." />
      <TextField label="Mobile phone (optional)" value={values.phone} onChangeText={set('phone')} error={errors.phone} keyboardType="phone-pad" autoComplete="tel" testID="profile-phone" />
      {saved ? (
        <Notice tone="success" testID="profile-saved">
          Looks good. (Demo: changes are not stored.)
        </Notice>
      ) : null}
      <AppText variant="caption" color="textMuted">
        We only ask for what we need to reach you. Health information is collected in your secure clinical intake.
      </AppText>
    </Screen>
  );
}
