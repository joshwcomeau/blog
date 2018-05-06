import React from 'react';

import { COLORS } from '../../../constants';

import BlogPostTemplate from '../../../templates/BlogPost';
import Paragraph from '../../../components/Paragraph';

export const FRONT_MATTER = {
  title: 'Interactive Bézier Curves',
  slug: 'interactive-bezier-curves',
  published: false,
  publishedOn: '2018-05-29',
  heroStyle: 'watermelon-gradient',
  heroImage: null,
  heroBackground: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
  heroTitleGradientSteps: ['80deg', COLORS.pink[500], COLORS.purple[700]],
  abstract:
    "Learn how to fold up the DOM like origami. We'll look at how to create Flipboard-like folding UI, and how to abstract that into generalized, reusable React components.",
};

export default () => (
  <BlogPostTemplate {...FRONT_MATTER}>
    <Paragraph>Placeholder text for a blog post!</Paragraph>

    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus lectus,
      interdum eget dui at, aliquam dapibus justo. Etiam quis aliquam arcu, et
      eleifend massa. Sed sodales leo nec arcu luctus efficitur. Curabitur
      semper scelerisque neque, a mattis est lobortis at. Nullam tincidunt
      suscipit orci eu tincidunt. Fusce dictum pretium commodo. Sed eget
      hendrerit dui, sit amet pharetra nulla. Mauris sit amet erat ut ligula
      facilisis cursus vitae nec ligula. Cras eu arcu risus. Nulla neque quam,
      gravida sit amet libero non, aliquam mollis augue. Aenean vehicula
      vulputate faucibus. Cras ut rutrum quam. Maecenas blandit eros in tellus
      mattis, vel mollis dui venenatis. Mauris congue imperdiet turpis, ut
      tincidunt lectus accumsan eu. Nulla consectetur ultricies urna eget
      aliquet.
    </Paragraph>

    <Paragraph>
      Morbi dapibus urna neque, eu vehicula sem consequat id. Aliquam erat
      volutpat. Curabitur quis accumsan tortor. Quisque varius scelerisque felis
      ut commodo. Quisque sit amet nulla libero. Sed id mauris eu ante pulvinar
      scelerisque. Ut accumsan mauris ultricies convallis faucibus. Aliquam eget
      dui nisi. Donec urna dolor, tincidunt et semper eget, dignissim at turpis.
    </Paragraph>

    <Paragraph>
      Ut id ipsum et elit euismod cursus. Praesent augue nisl, volutpat in metus
      eu, tempus ullamcorper justo. Aliquam vehicula laoreet maximus. Nullam
      eleifend ex erat, id viverra ex rhoncus a. Cras dapibus diam et lectus
      egestas, id eleifend lectus vehicula. Integer eleifend, justo et ornare
      sagittis, dui massa condimentum lectus, tempor efficitur mi eros et enim.
      Aenean orci felis, ornare vel ligula et, scelerisque eleifend justo. Nam
      in volutpat diam, id molestie nisi. Duis mattis, magna at aliquet
      ultrices, justo justo volutpat elit, ut vehicula ex dolor sit amet tortor.
      Proin sit amet euismod odio, in interdum dui. Aliquam finibus blandit
      augue, sit amet rutrum lorem tempus ac.
    </Paragraph>

    <Paragraph>
      Vestibulum semper sem eget enim tristique semper. Integer nec placerat
      tortor, sit amet volutpat nunc. Aliquam in velit volutpat ex iaculis
      semper. Morbi pulvinar mauris lacus, at convallis purus maximus malesuada.
      Integer eget mauris fringilla, mattis est condimentum, blandit arcu. Donec
      at diam odio. Integer sodales purus velit, vitae ullamcorper orci maximus
      ut. Maecenas vel ante eget risus scelerisque tempor vel quis felis. Cras
      sodales, ante eget dapibus vestibulum, lorem justo egestas augue, ac
      euismod ex metus suscipit ex. Proin sed sem libero. Suspendisse
      ullamcorper nunc a urna iaculis, ut ultrices arcu accumsan. Vivamus
      efficitur sed ligula eu aliquet.
    </Paragraph>
  </BlogPostTemplate>
);
