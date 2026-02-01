import styled from 'styled-components';

export const RoomInitFormContainer = styled.div`
    max-width: 300px;
    margin: 0 auto;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  input[type="submit"] {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #45a049;
  }
`
