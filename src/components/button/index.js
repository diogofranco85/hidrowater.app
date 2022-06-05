import styled from 'styled-components/native';
import { TextPrimary } from '../text';

const BtnPrimaryStyled = styled.TouchableOpacity`
    border: solid;
    border-width: 2px;
    border-color: teal;
    color: teal;
    background-color: #fff;
    margin-top: 15px;
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    &hover {
        opacity: 0.8;
    }
`

export function BtnPrimary({ text, ...rest }) {
    return (
        <BtnPrimaryStyled {...rest}>
            <TextPrimary>{text}</TextPrimary>
        </BtnPrimaryStyled>
    )
}
