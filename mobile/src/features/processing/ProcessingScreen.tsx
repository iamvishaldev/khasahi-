import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {useHealthProfileSummary} from '@/features/profile/hooks/useHealthProfileSummary';
import {AppStackParamList} from '@/types/navigation';
import {ProcessingHeader} from './components/ProcessingHeader';
import {AnimatedAIIcon} from './components/AnimatedAIIcon';
import {ProcessingStatus} from './components/ProcessingStatus';
import {IngredientChip} from './components/IngredientChip';
import {ProgressTimeline} from './components/ProgressTimeline';
import {LoadingCard} from './components/LoadingCard';
import {HealthProfileCard} from './components/HealthProfileCard';
import {useProcessingSequence} from './hooks/useProcessingSequence';
import {getProcessingStageCopy} from './hooks/getProcessingStageCopy';
import {PROCESSING_STAGE_ORDER, ProcessingResult} from './types/processing.types';

type ProcessingRouteProp = RouteProp<AppStackParamList, 'Processing'>;
type ProcessingNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Processing'>;

export function ProcessingScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<ProcessingNavigationProp>();
  const {params} = useRoute<ProcessingRouteProp>();
  const healthProfile = useHealthProfileSummary();

  function handleFinished(result: ProcessingResult) {
    navigation.replace('Analysis', {scanId: result.scanId});
  }

  const {stage, ingredients, remainingSeconds, cancel} = useProcessingSequence({
    photoUri: params.photoUri,
    userProfile: healthProfile,
    onFinished: handleFinished,
  });

  const copy = getProcessingStageCopy(stage);
  const stageIndex = PROCESSING_STAGE_ORDER.indexOf(stage);

  function handleCancel() {
    cancel();
    navigation.goBack();
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.colors.background.primary}]}>
      <View style={[styles.content, {padding: theme.spacing.xl, gap: theme.spacing.lg}]}>
        <ProcessingHeader />

        <View style={[styles.hero, {gap: theme.spacing.lg}]}>
          <AnimatedAIIcon />

          <View style={{gap: theme.spacing.xs}}>
            <AppText variant="display" style={styles.centerText}>
              Analyzing Your Product
            </AppText>
            <AppText variant="body" color="secondary" style={styles.centerText}>
              Our AI is reading ingredients and generating personalized
              recommendations.
            </AppText>
          </View>

          <ProcessingStatus title={copy.title} rotatingMessages={copy.rotatingMessages} />

          <View style={styles.stageContent}>
            {stage === 'uploading' ? <LoadingCard photoUri={params.photoUri} /> : null}

            {stage === 'reading' ? (
              <View style={[styles.chipRow, {gap: theme.spacing.sm}]}>
                {ingredients.map((ingredient, index) => (
                  <IngredientChip key={ingredient.id} name={ingredient.name} index={index} />
                ))}
              </View>
            ) : null}

            {stage === 'profile' ? <HealthProfileCard {...healthProfile} /> : null}
          </View>
        </View>

        <View style={[styles.footer, {gap: theme.spacing.md}]}>
          <ProgressTimeline currentIndex={stageIndex} total={PROCESSING_STAGE_ORDER.length} />
          <AppText variant="caption" color="secondary">
            ~{remainingSeconds}s remaining
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cancel analysis"
            hitSlop={12}
            onPress={handleCancel}
            style={styles.cancelButton}>
            <AppText variant="label" color="secondary">
              Cancel
            </AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageContent: {
    width: '100%',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
