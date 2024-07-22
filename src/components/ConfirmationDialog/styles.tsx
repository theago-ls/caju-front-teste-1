import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;

  height: max-content;
  width: max-content;

  h3 {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Text = styled.p`
  margin: 10px 0;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;

  svg {
    cursor: pointer;
  }
`;
