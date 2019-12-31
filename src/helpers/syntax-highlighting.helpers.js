export const syntaxTheme = {
  plain: {
    color: '#2A2A2A',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  styles: [
    {
      types: ['prolog', 'comment', 'doctype', 'cdata'],
      style: {
        color: '#B0BEC5',
      },
    },
    {
      types: ['property', 'tag', 'deleted', 'constant', 'symbol'],
      style: { color: '#f40088' },
    },
    {
      types: ['boolean', 'number'],
      style: { color: '#FF9100' },
    },
    {
      types: ['attr-name', 'tag'],
      style: { fontWeight: '700' },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#78909C',
      },
    },
    {
      types: [
        'operator',
        'entity',
        'url',
        'string',
        'variable',
        'language-css',
        'keyword',
      ],
      style: {
        color: '#651fff',
      },
    },
    {
      types: [
        'selector',
        'attr-name',
        'char',
        'builtin',
        'insert',
        'script-punctuation',
      ],
      style: {
        color: '#AA00FF',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#ffd700',
      },
    },
    {
      types: ['atrule', 'function'],
      style: {
        color: '#3D5AFE',
      },
    },
    {
      types: ['symbol'],
      style: {
        opacity: '0.7',
      },
    },
    {
      types: ['string', 'comment'],
      style: {
        fontWeight: 500,
      },
    },
  ],
};
