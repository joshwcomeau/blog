import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

export default ({ children, type, image }) => {
    switch (type) {
        case 'clipped-bg': return <ClippedTitle image={image}>{children}</ClippedTitle>;
        default: return <SimpleTitle>{children}</SimpleTitle>
    }
}

const Title = styled.h1`
    font-size: 72px;
`

const SimpleTitle = styled(Title)`
    color: ${COLORS.gray[900]};
`;

const ClippedTitle = styled(Title)`
    /* stuff */
`;
