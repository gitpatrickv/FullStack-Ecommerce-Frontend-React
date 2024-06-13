import { Box, Grid, GridItem } from "@chakra-ui/react";

const AdminPage = () => {
  return (
    <Grid
      height="100vh"
      templateColumns="0.2fr 1fr 0.2fr"
      templateRows="0.1fr 1fr"
      templateAreas={`
        "header header header"

        "sidebar content1 sidebar1"

      `}
    >
      <GridItem area="sidebar">
        <Box bg="gray" height="100%">
          Sidebar
        </Box>
      </GridItem>
      <GridItem area="header">
        <Box bg="maroon" height="100%">
          header
        </Box>
      </GridItem>

      <GridItem area="sidebar1">
        <Box bg="orange" height="100%">
          Sidebar 1
        </Box>
      </GridItem>
      <GridItem area="content1">
        <Box bg="red" height="100%">
          Content 1
        </Box>
      </GridItem>
    </Grid>
  );
};

export default AdminPage;

{
  /* <Grid
height="100vh"
templateColumns="0.4fr 1fr 0.5fr 0.5fr 0.5fr 0.5fr 0.4fr"
templateRows="0.2fr 0.3fr 3fr 0.3fr"
templateAreas={`
  "sidebar header header header header header sidebar1"
  "sidebar nav nav nav nav nav sidebar1"
  "sidebar content1 content2 content3 content4 content5 sidebar1"
  "sidebar footer footer footer footer footer sidebar1"
`}
>
<GridItem area="sidebar">
  <Box bg="gray" height="100%">
    Sidebar
  </Box>
</GridItem>
<GridItem area="header">
  <Box bg="maroon" height="100%">
    header
  </Box>
</GridItem>
<GridItem area="nav">
  <Box bg="blue" height="100%">
    Nav
  </Box>
</GridItem>
<GridItem area="sidebar1">
  <Box bg="orange" height="100%">
    Sidebar 1
  </Box>
</GridItem>
<GridItem area="content1">
  <Box bg="red" height="100%">
    Content 1
  </Box>
</GridItem>
<GridItem area="content2">
  <Box bg="green" height="100%">
    Content 2
  </Box>
</GridItem>
<GridItem area="content3">
  <Box bg="yellow" height="100%">
    Content 3
  </Box>
</GridItem>
<GridItem area="content4">
  <Box bg="purple" height="100%">
    Content 4
  </Box>
</GridItem>
<GridItem area="content5">
  <Box bg="brown" height="100%">
    Content 5
  </Box>
</GridItem>
<GridItem area="footer">
  <Box bg="skyblue" height="100%">
    Footer
  </Box>
</GridItem>
</Grid> */
}
