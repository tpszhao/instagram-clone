import styled from "styled-components";

export const ToolBar = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1;
  width: 100%;
  max-width: 100vw;
  height: 80px;

  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props => `
        background-color: ${props.theme.bodyBackgroundColor};
        border-bottom: 1px solid ${props.theme.borderColor};
    `}
`;

export const Form = styled.form`
  position: absolute;
  width: 288px;
  max-width: calc(100% - 146px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0px 10px;
  border-radius: 20px;

  ${props => `
        background-color: ${props.theme.inputFieldBackground};
        border: 1px solid ${props.theme.borderColor};
    `}
`;

export const SearchInput = styled.input`
  position: relative;
  z-index: 2;

  width: 80%;
  line-height: 40px;
  font-size: 16px;

  outline: none;
  border: none;

  text-align: center;
  padding: 0px 20px;

  background-color: inherit;

  &:focus {
    text-align: left;
  }

  ${props => `
        color:${props.theme.inputTextColor};
    `};
`;

export const SearchSuggestionContainer = styled.div<{ active: boolean }>`
  ${props => !props.active && "display:none;"}
  top: calc(75% + 5px);
  width: 288px;
  max-width: calc(100% - 96px);
  background-color: white;
  background-clip: content-box;
  text-align: center;
  position: absolute;
  cursor: text;
  z-index: 1;
  &:empty {
    border: none;
  }

  ${props => `
        background-color:${props.theme.backgroundColor};
        color: ${props.theme.inputTextColor};
        border: 1px solid ${props.theme.borderColor};
    `}
`;

export const SuggestionItem = styled.div`
  padding: 1px;
  &:hover {
    cursor: pointer;
    background-color: rgb(200, 200, 200);
    color: white;
  }
`;

export const IconBar = styled.div<{ pathname: string }>`
  width: 944px;
  max-width: 100vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 976px) {
    ${props => props.pathname === "/" && "width:616px"};
  }
`;

export const RightSideIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
