import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import { 
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Brand,
    Name,
    Description,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';

export function CarDetails(){
  
  return (
      <Container>
        <Header>
          <BackButton onPress={() => {}}/>
        </Header>
        <CarImages>
          <ImageSlider imagesUrl={['https://img1.gratispng.com/20180331/izq/kisspng-audi-rs-6-audi-rs6-audi-a6-car-audi-5abf3cdc8a3545.0356772815224823965661.jpg']}/>
        </CarImages>
        <Content>
          <Details>
            <Description>
              <Brand>Audi</Brand>
              <Name>RS 5 Coupé</Name>
            </Description>

            <Rent>
              <Period>Ao dia</Period>
              <Price>R$ 580</Price>
            </Rent>
          </Details>
          <Accessories>
            <Accessory name="380Km/h" icon={speedSvg}/>
            <Accessory name="3.2s" icon={accelerationSvg}/>
            <Accessory name="800 HP" icon={forceSvg}/>
            <Accessory name="Gasolina" icon={gasolineSvg}/>
            <Accessory name="Auto" icon={exchangeSvg}/>
            <Accessory name="2 pessoas" icon={peopleSvg}/>
          </Accessories>
          <About>
            Este é automóvel desportivo. Surgiu do lendário
            touro de lide indultado na praça Real Maestranza de Sevilla.
            É um belíssimo carro para quem gosta de acelerar.
          </About>
        </Content>
        <Footer>
          <Button title="Confirmar"/>
        </Footer>
      </Container>
  );
} 