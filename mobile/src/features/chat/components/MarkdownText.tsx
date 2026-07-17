import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type MarkdownTextProps = {
  content: string;
  color: string;
};

const BOLD_PATTERN = /(\*\*[^*]+\*\*)/g;

/**
 * Minimal, dependency-free markdown for assistant replies: paragraphs,
 * "• " bullet lines, and **bold** spans — everything the mock (and
 * eventually real) AI responses actually use. Kept internal rather than
 * one of the named chat components, the same way SectionCard backs the
 * analysis feature's cards.
 */
export function MarkdownText({content, color}: MarkdownTextProps): React.JSX.Element {
  const theme = useAppTheme();
  const lines = content.split('\n');

  return (
    <View style={{gap: theme.spacing.xs}}>
      {lines.map((line, index) => {
        if (line.trim().length === 0) {
          return null;
        }

        const isBullet = line.trim().startsWith('• ');
        const text = isBullet ? line.trim().slice(2) : line;

        return (
          <View key={index} style={isBullet ? styles.bulletRow : undefined}>
            {isBullet ? (
              <Text style={[styles.bulletDot, {color}]}>•</Text>
            ) : null}
            <Text style={[styles.line, {color}, isBullet ? styles.bulletText : undefined]}>
              {renderBoldSpans(text, color)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function renderBoldSpans(text: string, color: string): React.ReactNode {
  const parts = text.split(BOLD_PATTERN);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Fragment key={index}>
          <Text style={[styles.bold, {color}]}>{part.slice(2, -2)}</Text>
        </Fragment>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

const styles = StyleSheet.create({
  line: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'PlusJakartaSans-Regular',
    flexShrink: 1,
  },
  bold: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
  },
  bulletDot: {
    fontSize: 15,
    lineHeight: 21,
  },
  bulletText: {
    flex: 1,
  },
});
