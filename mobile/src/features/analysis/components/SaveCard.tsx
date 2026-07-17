import React from 'react';
import {Pressable, Share, StyleSheet, View} from 'react-native';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type SaveCardProps = {
  productName: string;
  healthScoreValue: number;
  saved: boolean;
  onSave: () => void;
};

export function SaveCard({
  productName,
  healthScoreValue,
  saved,
  onSave,
}: SaveCardProps): React.JSX.Element {
  const theme = useAppTheme();

  async function handleShare() {
    await Share.share({
      message: `${productName} scored ${healthScoreValue}/100 on Khasahi AI's health analysis.`,
    });
  }

  return (
    <View style={{gap: theme.spacing.md}}>
      <PrimaryButton label={saved ? 'Saved ✓' : 'Save to History'} onPress={onSave} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Share report"
        onPress={handleShare}
        style={[
          styles.shareButton,
          {borderColor: theme.colors.border.subtle, borderRadius: theme.radii.pill, paddingVertical: theme.spacing.sm + 2},
        ]}>
        <AppText variant="button">Share Report</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
