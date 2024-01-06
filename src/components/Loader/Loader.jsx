import { Circles } from 'react-loader-spinner'
import styled from 'styled-components'

const LoaderWrap = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`

export const Loader = () => {
    return <LoaderWrap>
        <Circles
            height="80"
            width="80"
            radius="9"
            color="lightblue"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
        />
    </LoaderWrap>
}