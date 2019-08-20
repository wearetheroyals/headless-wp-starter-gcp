export const HeroBannerSampleData = {
  name: 'First Blog Article Block',
  title: 'This is a Hero Banner',
  button: {
    linkReference: '#',
    style: 'light',
    innerHtml: {
      childMarkdownRemark: {
        html: 'Link to somewhere',
      },
    },
  },
  subtitle: {
    childMarkdownRemark: {
      html: 'This is a banner subtitle',
    },
  },
}
