import {
  Box,
  Card,
  CardBody,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const MyPurchasePage = () => {
  return (
    <Box>
      <Tabs position="relative" variant="unstyled" isLazy>
        <TabList display="flex" justifyContent="space-between">
          <Tab>All</Tab>
          <Tab>To Pay</Tab>
          <Tab>To Ship</Tab>
          <Tab>To Receive</Tab>
          <Tab>Completed</Tab>
          <Tab>Cancelled</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="orange.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Card bg="blue">
              <CardBody></CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <p>To Pay</p>
          </TabPanel>
          <TabPanel>
            <p>To Ship</p>
          </TabPanel>
          <TabPanel>
            <p>To Receive</p>
          </TabPanel>
          <TabPanel>
            <p>Completed</p>
          </TabPanel>
          <TabPanel>
            <p>Cancelled</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyPurchasePage;
