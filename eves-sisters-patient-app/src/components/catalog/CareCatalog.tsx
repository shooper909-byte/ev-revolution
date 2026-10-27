import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { AppText, Button, EmptyState, Notice, SectionHeader, SegmentedControl, TextField } from '@/components/ui';
import {
  catalogSource,
  membershipTiers,
  mrsCollection,
  mrsPricingStatement,
  searchTreatments,
  treatmentCategories,
  trustPoints,
} from '@/data/catalog';
import { spacing } from '@/theme';

import { CategoryCard, MembershipTierCard, MrsCard, TreatmentRow } from './CatalogCards';

type View_ = 'collection' | 'treatments' | 'memberships';

/** The browsable service catalog, shared by Explore (signed out) and the Care tab. */
export function CareCatalog({ initialView = 'collection' }: { initialView?: View_ }) {
  const [view, setView] = useState<View_>(initialView);
  const [query, setQuery] = useState('');
  const results = useMemo(() => (query.trim() ? searchTreatments(query) : []), [query]);
  const categories = treatmentCategories.filter((c) => c.kind === 'category');
  const pathways = treatmentCategories.filter((c) => c.kind === 'pathway');

  return (
    <View style={{ gap: spacing.lg }}>
      <SegmentedControl
        accessibilityLabel="Catalog section"
        value={view}
        onChange={setView}
        options={[
          { value: 'collection', label: 'Mrs. Collection' },
          { value: 'treatments', label: 'Treatments' },
          { value: 'memberships', label: 'Memberships' },
        ]}
      />

      {view === 'collection' ? (
        <View style={{ gap: spacing.lg }}>
          <SectionHeader eyebrow="Curated care" title="The Mrs. Collection" />
          <AppText color="textSubtle">Three signature programs, each shaped around a stage of life and a way of living.</AppText>
          {mrsCollection.map((p) => (
            <MrsCard key={p.slug} pkg={p} />
          ))}
          <Notice tone="brand" title="About pricing">
            {mrsPricingStatement}
          </Notice>
        </View>
      ) : null}

      {view === 'treatments' ? (
        <View style={{ gap: spacing.lg }}>
          <TextField
            label="Search treatments"
            value={query}
            onChangeText={setQuery}
            placeholder="e.g. tretinoin, estradiol, hair"
            autoCapitalize="none"
            returnKeyType="search"
            testID="treatment-search"
          />
          {query.trim() ? (
            results.length ? (
              <View style={{ gap: spacing.md }}>
                <AppText variant="caption" color="textMuted" accessibilityLiveRegion="polite">
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </AppText>
                {results.map((t) => (
                  <TreatmentRow key={t.slug} treatment={t} />
                ))}
              </View>
            ) : (
              <EmptyState
                icon="search-outline"
                title="No treatments match"
                body="Try another name, or browse the care areas below."
                actionLabel="Clear search"
                onAction={() => setQuery('')}
              />
            )
          ) : (
            <>
              <SectionHeader eyebrow="By care area" title="Treatments" />
              {categories.map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
              <SectionHeader eyebrow="By goal" title="Care pathways" />
              {pathways.map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
            </>
          )}
        </View>
      ) : null}

      {view === 'memberships' ? (
        <View style={{ gap: spacing.lg }}>
          <SectionHeader eyebrow="Membership" title="Care that grows with you" />
          {membershipTiers.map((t) => (
            <MembershipTierCard key={t.id} tier={t} />
          ))}
          <Button label="Compare & choose a membership" icon="sparkles-outline" onPress={() => router.push('/memberships')} />
          <View style={{ gap: spacing.sm }}>
            {trustPoints.map((p) => (
              <Notice key={p.title} tone="brand" title={p.title} icon={p.icon}>
                {p.copy}
              </Notice>
            ))}
          </View>
        </View>
      ) : null}

      <AppText variant="caption" color="textMuted" align="center">
        Catalog copy from {catalogSource.label}, retrieved {catalogSource.retrieved}. Availability, eligibility and pricing are confirmed during
        your consultation.
      </AppText>
    </View>
  );
}
