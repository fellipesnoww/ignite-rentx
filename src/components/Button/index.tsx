import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { Container, Title } from './styles';
import theme from '../../styles/theme';

interface Props extends RectButtonProps{
    title: string;
    color?: string;
    onPress: () => void;
    enabled?: boolean;
    loading?: boolean;
    light?: boolean;
}

export function Button({title, color, onPress, enabled = true, loading = false, light = false, ...rest}: Props){
  return (
      <Container {...rest} 
          color={color} 
          enabled={enabled} 
          onPress={onPress}
          style={{opacity: (enabled === false || loading === true) ? 0.5 : 1}}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.shape}/>
          ) : (
            <Title light={light}>{title}</Title>
          )}
          
          
      </Container>
  );
}