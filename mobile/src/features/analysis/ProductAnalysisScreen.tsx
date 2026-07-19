import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {Icon} from '@/components/icons/Icon';
import {useAppTheme} from '@/theme/useAppTheme';
import {AppStackParamList} from '@/types/navigation';
import {ProductHero} from './components/ProductHero';
import {HealthScoreCard} from './components/HealthScoreCard';
import {AIVerdictCard} from './components/AIVerdictCard';
import {PersonalizedInsightCard} from './components/PersonalizedInsightCard';
import {IngredientCard} from './components/IngredientCard';
import {NutritionCard} from './components/NutritionCard';
import {AlternativeCard} from './components/AlternativeCard';
import {QuickActionCard} from './components/QuickActionCard';
import {SaveCard} from './components/SaveCard';
import {useProductAnalysis} from './hooks/useProductAnalysis';
import {Ingredient} from './types/analysis.types';

type AnalysisRouteProp = RouteProp<AppStackParamList, 'Analysis'>;
type AnalysisNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Analysis'>;

type QuickAction = {
  id: string;
  icon: string;
  label: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  {id: 'explain-ingredients', icon: '🧪', label: 'Explain every ingredient'},
  {id: 'diabetic-safe', icon: '🩸', label: 'Can diabetics eat this?'},
  {id: 'child-safe', icon: '🧒', label: 'Is this safe for children?'},
  {id: 'compare-product', icon: '⚖️', label: 'Compare with another product'},
  {id: 'suggest-alternatives', icon: '🌱', label: 'Suggest healthier alternatives'},
];

export function ProductAnalysisScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<AnalysisNavigationProp>();
  const {params} = useRoute<AnalysisRouteProp>();
  const {analysis, isLoading, error, retry} = useProductAnalysis(params?.scanId);
  const [saved, setSaved] = useState(false);

  function openAIChat() {
    navigation.navigate('Chat', {scanId: params?.scanId});
  }

  function handleLearnMore(_ingredient: Ingredient) {
    openAIChat();
  }

  if (isLoading) {
    return (
      <View style={[styles.loadingWrap, {backgroundColor: theme.colors.background.primary}]}>
        <ActivityIndicator color={theme.colors.accent.primary} />
        <AppText variant="body" color="secondary" style={styles.loadingText}>
          Analyzing with AI...
        </AppText>
      </View>
    );
  }

  if (error || !analysis) {
    return (
      <View
        style={[
          styles.loadingWrap,
          {backgroundColor: theme.colors.background.primary, padding: theme.spacing.xl},
        ]}>
        <Icon name="alert-triangle" size={40} color={theme.colors.feedback.danger} />
        <AppText variant="heading" style={styles.errorTitle}>
          AI analysis failed
        </AppText>
        <AppText variant="body" color="secondary" style={styles.errorBody}>
          {error ?? 'Something went wrong while analyzing this product.'}
        </AppText>
        <View style={[styles.errorActions, {gap: theme.spacing.sm}]}>
          <PrimaryButton label="Try Again" onPress={retry} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={{backgroundColor: theme.colors.background.primary}}
      contentContainerStyle={[styles.content, {padding: theme.spacing.xl, gap: theme.spacing.lg}]}>
      <View style={[styles.aiBadge, {gap: theme.spacing.xs}]}>
        <Icon name="sparkles" size={14} color={theme.colors.accent.primary} />
        <AppText variant="caption" color="secondary">
          Powered by OpenAI Vision · Personalized for your goals
        </AppText>
      </View>

      <ProductHero product={analysis.product} />

      <HealthScoreCard healthScore={analysis.healthScore} />

      <AIVerdictCard verdict={analysis.verdict} confidence={analysis.confidence} />

      <PersonalizedInsightCard
        userProfile={analysis.userProfile}
        recommendation={analysis.recommendation}
      />

      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="heading">Ingredient Analysis</AppText>
        <View style={{gap: theme.spacing.sm}}>
          {analysis.ingredients.map(ingredient => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onLearnMore={handleLearnMore}
            />
          ))}
        </View>
      </View>

      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="heading">Nutrition Facts</AppText>
        <View style={[styles.nutritionGrid, {gap: theme.spacing.sm}]}>
          {analysis.nutrition.map(fact => (
            <NutritionCard key={fact.id} nutrition={fact} />
          ))}
        </View>
      </View>

      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="heading">Healthier Alternatives</AppText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={216}
          snapToAlignment="start"
          contentContainerStyle={{gap: theme.spacing.md}}>
          {analysis.alternatives.map(alternative => (
            <AlternativeCard
              key={alternative.id}
              alternative={alternative}
              onCompare={openAIChat}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="heading">AI Quick Actions</AppText>
        <View style={{gap: theme.spacing.sm}}>
          {QUICK_ACTIONS.map(action => (
            <QuickActionCard
              key={action.id}
              icon={action.icon}
              label={action.label}
              onPress={openAIChat}
            />
          ))}
        </View>
      </View>

      <SaveCard
        productName={analysis.product.name}
        healthScoreValue={analysis.healthScore.value}
        saved={saved}
        onSave={() => setSaved(true)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
  },
  errorTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  errorBody: {
    marginTop: 4,
    textAlign: 'center',
  },
  errorActions: {
    marginTop: 24,
    width: '100%',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
