import styled, { keyframes } from "styled-components";

export const ModalLoadingStyle = styled.section`
    width: 100vw;
    height: 88.45vh;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CircleLoadingStyle = styled.div`
  border: 4px solid #fff; /* cor da borda do spinner */
  border-top: 4px solid #8728e0; /* cor da borda do spinner quando está rodando */
  border-radius: 50%;
  width: 50px; /* largura do spinner */
  height: 50px; /* altura do spinner */
  animation: ${spin} 0.8s linear infinite; /* animação de rotação */
  position: absolute;
  top: 40%;
  left: 50%;
`;