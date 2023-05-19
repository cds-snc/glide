import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  chakra,
  Code,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  ModalProps,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { intervalToDuration, format } from "date-fns";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, MakeGenerics, useMatch } from "react-location";
import { AuditLog } from "../../components/AuditLog";
import {
  Days,
  DurationInput,
  Hours,
  Minutes,
  Weeks,
} from "../../components/DurationInput";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

import { ProviderIcon, ShortTypes } from "../../components/icons/providerIcon";
import { UserLayout } from "../../components/Layout";
import { GrantStatusCell, StatusCell } from "../../components/StatusCell";
import {
  useGetGroupTargetInstructions,
  useUserGetRequest,
  useUserListRequests,
} from "../../utils/backend-client/default/default";
import {
  userCancelRequest,
  userReviewRequest,
  userRevokeRequest,
} from "../../utils/backend-client/end-user/end-user";
import {
  RequestAccessGroup,
  RequestAccessGroupTarget,
  RequestStatus,
  Target,
  TargetField,
} from "../../utils/backend-client/types";

import {
  durationString,
  durationStringHoursMinutes,
  getEndTimeWithDuration,
} from "../../utils/durationString";
import { request } from "http";
import FieldsCodeBlock from "../../components/FieldsCodeBlock";
import { TargetDetail } from "../../components/Target";
import { useUser } from "../../utils/context/userContext";

type MyLocationGenerics = MakeGenerics<{
  Search: {
    action?: "approve" | "close";
  };
}>;

const Home = () => {
  const {
    params: { id: requestId },
  } = useMatch();

  const request = useUserGetRequest(requestId, {
    // @ts-ignore; type discrepancy with latest SWR client
    swr: { refreshInterval: 10000 },
  });
  const toast = useToast();

  const [cancelLoading, setCancelLoading] = useState(false);

  const { user, isAdmin } = useUser();

  // THIS MUST HAPPEN ACCESS GROUP LEVEL!
  const isReviewer =
    user && request?.data
      ? !!request.data?.accessGroups.find((ag) => {
          // look through groupReviewers
          return ag.groupReviewers
            ? ag.groupReviewers.find((gr) => {
                return gr === user.id;
              })
            : false;
        })
      : false;

  const [mutationLoading, setMutationLoading] = useState(false);

  const requestIsActive = request?.data?.status === RequestStatus.ACTIVE;

  // const buttonText = requestIsActive ? "Revoke" : "Cancel";

  const handleRevoke = async () => {
    setMutationLoading(true);
    userRevokeRequest(requestId)
      .then(() => {
        request.mutate();
        toast({
          title: "Request revoked",
          description: "The request has been revoked.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Request revoke failed",
          description: "The request could not be revoked.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setMutationLoading(false);
      });
  };

  const handleCancel = async () => {
    setMutationLoading(true);
    userCancelRequest(requestId)
      .then(() => {
        request.mutate();
        toast({
          title: "Request cancelled",
          description: "The request has been cancelled.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Request cancellation failed",
          description: "The request could not be cancelled.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setMutationLoading(false);
      });
  };

  return (
    <div>
      <UserLayout>
        <Helmet>
          <title>Access Request</title>
        </Helmet>
        {/* The header bar */}
        <Center borderBottom="1px solid" borderColor="neutrals.200" h="80px">
          <IconButton
            as={Link}
            aria-label="Go back"
            pos="absolute"
            left={4}
            icon={<ArrowBackIcon />}
            rounded="full"
            variant="ghost"
            to={"/requests"}
          />

          <Text as="h4" textStyle="Heading/H4">
            Request details
          </Text>
        </Center>
        {/* isReviewer {isReviewer} */}

        {/* Main content */}
        <Container
          maxW={{
            md: "container.lg",
          }}
        >
          <Grid mt={8} gridTemplateColumns={{ sm: "1fr 240px" }} gap="4">
            <GridItem>
              <>
                <Stack spacing={4}>
                  <Flex direction="row" w="100%">
                    {request.data ? (
                      <Flex
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        w="100%"
                        mr="10px"
                      >
                        <Flex h="40px">
                          <Avatar
                            size="sm"
                            src={request.data.requestedBy.picture}
                            name={
                              request.data.requestedBy.firstName +
                              " " +
                              request.data.requestedBy.lastName
                            }
                            mr={2}
                          />
                          <Stack spacing={1}>
                            <Flex>
                              <Text textStyle="Body/Small" lineHeight="1.4em">
                                {request.data.requestedBy.firstName +
                                  " " +
                                  request.data.requestedBy.lastName}
                              </Text>
                              <Text
                                textStyle="Body/Small"
                                lineHeight="1.4em"
                                ml={1}
                                color="neutrals.500"
                              >
                                requested at&nbsp;
                                {format(
                                  new Date(
                                    Date.parse(request.data.requestedAt)
                                  ),
                                  "p dd/MM/yy"
                                )}
                              </Text>
                            </Flex>

                            <Text textStyle="Body/Small" color="neutrals.500">
                              {request.data.requestedBy.email}
                            </Text>
                          </Stack>
                        </Flex>
                        <Flex alignSelf="flex-start" alignContent="flex-end">
                          {request.data.status == "ACTIVE" && (
                            <ButtonGroup variant="brandSecondary">
                              <Button
                                size="sm"
                                onClick={
                                  requestIsActive ? handleRevoke : handleCancel
                                }
                                // onClick={() => {
                                //   console.log("revoke");
                                //   //@ts-ignore
                                //   userRevokeRequest(request.data?.id)
                                //     .then((e) => {
                                //       toast({
                                //         title: "Revoke Initiated",
                                //         status: "success",
                                //         variant: "subtle",
                                //         duration: 2200,
                                //         isClosable: true,
                                //       });
                                //     })
                                //     .catch((e) => {
                                //       toast({
                                //         title: "Error Revoking",
                                //         status: "error",
                                //         variant: "subtle",
                                //         duration: 2200,
                                //         isClosable: true,
                                //       });
                                //     });
                                // }}
                              >
                                {requestIsActive ? "Revoke" : "Cancel"}
                              </Button>
                            </ButtonGroup>
                          )}
                          {request.data.status == "PENDING" && (
                            <ButtonGroup variant="brandSecondary">
                              <Button
                                size="sm"
                                isLoading={mutationLoading}
                                loadingText={
                                  requestIsActive
                                    ? "Revoking..."
                                    : "Cancelling..."
                                }
                                onClick={
                                  requestIsActive ? handleRevoke : handleCancel
                                }
                              >
                                {requestIsActive ? "Revoke" : "Cancel"}
                              </Button>
                            </ButtonGroup>
                          )}
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex h="42px">
                        <SkeletonCircle size="24px" mr={4} />
                        <Box>
                          <Flex>
                            <SkeletonText
                              noOfLines={1}
                              h="12px"
                              w="12ch"
                              mr="4px"
                            />
                            <SkeletonText noOfLines={1} h="12px" w="12ch" />
                          </Flex>
                          <SkeletonText noOfLines={1} h="12px" w="12ch" />
                        </Box>
                      </Flex>
                    )}
                  </Flex>
                  <Divider borderColor="neutrals.300" w="100%" />

                  <Stack spacing={4} w="100%">
                    {request.data
                      ? request.data.accessGroups.map((group) => (
                          <AccessGroupItem key={group.id} group={group} />
                        ))
                      : [
                          <Skeleton key={1} rounded="md" h="282px" w="100%" />,
                          <Skeleton key={2} rounded="md" h="82px" w="100%" />,
                          <Skeleton key={3} rounded="md" h="82px" w="100%" />,
                        ]}
                  </Stack>
                </Stack>

                {/* <Code
                  maxW="60ch"
                  textOverflow="clip"
                  whiteSpace="pre-wrap"
                  mt={32}
                >
                  {JSON.stringify({ request }, null, 2)}
                </Code> */}
              </>
            </GridItem>
            <GridItem>
              <AuditLog request={request.data} />
            </GridItem>
          </Grid>
          <Code whiteSpace="pre-wrap">
            {JSON.stringify({ isReviewer, data: request.data }, null, 2)}
          </Code>
        </Container>
      </UserLayout>
    </div>
  );
};

type AccessGroupProps = {
  group: RequestAccessGroup;
};

export const HeaderStatusCell = ({ group }: AccessGroupProps) => {
  let statusText = "";
  let renderStatus = false;
  switch (group.status) {
    case "PENDING_APPROVAL":
      if (group.requestStatus === "CANCELLED") {
        statusText = "Cancelled";
      } else statusText = "Review Required";
      break;
    case "DECLINED":
      statusText = "Declined";
      break;
    default:
      switch (group.requestStatus) {
        case "ACTIVE":
          statusText = "Active";
          renderStatus = true;
        case "PENDING":
          statusText = "Pending";
        case "REVOKING":
          statusText = "Revoking";
        case "REVOKED":
          statusText = "Revoked";
        case "COMPLETE":
          statusText = "Complete";
      }
  }

  return renderStatus ? (
    <Flex flex="1">
      <StatusCell
        success="ACTIVE"
        value={group.requestStatus}
        replaceValue={
          "Active for the next " +
          durationStringHoursMinutes(
            intervalToDuration({
              start: new Date(),
              end: new Date(
                group.finalTiming?.endTime ? group.finalTiming?.endTime : ""
              ),
            })
          )
        }
      />
    </Flex>
  ) : (
    <Box
      as="span"
      flex="1"
      textAlign="left"
      sx={{
        p: { lineHeight: "120%", textStyle: "Body/Extra Small" },
      }}
    >
      <Text color="neutrals.700">{statusText}</Text>
    </Box>
  );
};

export const AccessGroupItem = ({ group }: AccessGroupProps) => {
  const [selectedGrant, setSelectedGrant] =
    useState<RequestAccessGroupTarget>();
  const grantModalState = useDisclosure();

  const handleGrantClick = (grant: RequestAccessGroupTarget) => {
    setSelectedGrant(grant);
    grantModalState.onOpen();
  };
  const handleClose = () => {
    setSelectedGrant(undefined);
    grantModalState.onClose();
  };

  const user = useUser();

  const isGroupReviewer = !!group.groupReviewers?.find(
    (g) => g === user.user?.id
  );

  const requestActive = group.requestStatus === "ACTIVE";

  const requestPending = group.requestStatus === "PENDING";

  const showGrant =
    group.requestStatus != "CANCELLED" && group.requestStatus != "COMPLETE";

  return (
    <Box bg="neutrals.100" borderColor="neutrals.300" rounded="lg">
      <Accordion
        key={group.id}
        allowToggle
        // we may want to play with how default index works
        defaultIndex={[0]}
      >
        <AccordionItem border="none">
          <AccordionButton
            p={2}
            bg="neutrals.100"
            roundedTop="md"
            borderColor="neutrals.300"
            borderWidth="1px"
            sx={{
              "&[aria-expanded='false']": {
                roundedBottom: "md",
              },
            }}
          >
            <AccordionIcon boxSize="6" mr={2} />
            <HeaderStatusCell group={group} />
            {isGroupReviewer && requestPending && (
              <ApproveRejectDuration group={group} />
            )}
          </AccordionButton>

          <AccordionPanel
            borderColor="neutrals.300"
            borderTop="none"
            roundedBottom="md"
            borderWidth="1px"
            bg="white"
            p={0}
          >
            <Stack spacing={2} p={2} w="100%">
              {group.targets.map((target) => (
                <Flex
                  w="100%"
                  borderColor="neutrals.300"
                  rounded="md"
                  borderWidth="1px"
                  bg="white"
                  pos="relative"
                  justifyContent="flex-end"
                  align="flex-start"
                  h="120px"
                >
                  <TargetDetail
                    showIcon
                    target={{
                      fields: target.fields,
                      id: target.id,
                      kind: target.targetKind,
                    }}
                  />

                  <Flex
                    p={2}
                    h="100%"
                    flexDir="column"
                    justifyContent="space-between"
                  >
                    {showGrant && (
                      <GrantStatusCell
                        minW="120px"
                        justifyContent="end"
                        position="absolute"
                        right={3}
                        targetStatus={target.status}
                      />
                    )}
                    <Button
                      mt="auto"
                      variant="brandSecondary"
                      size="xs"
                      onClick={() => handleGrantClick(target)}
                    >
                      View
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <TargetGrantInstructionsModal
        groupTarget={selectedGrant}
        isOpen={grantModalState.isOpen}
        onClose={handleClose}
      />
    </Box>
  );
};

type Props = {
  groupTarget: RequestAccessGroupTarget | undefined;
} & Omit<ModalProps, "children">;

export const TargetGrantInstructionsModal = (props: Props) => {
  if (props.groupTarget) {
    const data = useGetGroupTargetInstructions(props.groupTarget?.id);

    return (
      <Modal {...props} isCentered motionPreset="slideInBottom" size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" my="30px" mx="10px">
              <HStack spacing="80%">
                <ProviderIcon
                  shortType={props.groupTarget?.targetKind.icon as ShortTypes}
                />
                <GrantStatusCell
                  alignSelf="flex-end"
                  targetStatus={props.groupTarget.status}
                />
              </HStack>

              <TargetDetail
                target={{
                  fields: props.groupTarget.fields,
                  id: props.groupTarget.id,
                  kind: props.groupTarget.targetKind,
                }}
                py="20px"
              />

              <Flex direction="column" py="20px">
                <Text textStyle="Body/Small">Access Instructions</Text>
                <Code>{data.data?.instructions.instructions}</Code>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box></Box>

          <Text></Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// @TODO: sort out state for props.........
type ApproveRejectDurationProps = {
  group: RequestAccessGroup;
};

export const ApproveRejectDuration = ({
  group,
}: ApproveRejectDurationProps) => {
  const user = useUser();
  console.log(user);

  const handleClickMax = () => {
    setDurationSeconds(group.accessRule.timeConstraints.maxDurationSeconds);
  };

  // durationSeconds state
  const [durationSeconds, setDurationSeconds] = useState<number>(
    group.requestedTiming.durationSeconds
  );

  const [isEditing, setIsEditing] = useBoolean();
  const toast = useToast();

  const [approveLoading, setApproveLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);

  return (
    <Flex
      alignSelf="baseline"
      flexDir="row"
      alignItems="center"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Flex h="32px" alignItems="baseline" flexDir="column" mr={4}>
        <Text textStyle="Body/ExtraSmall" color="neutrals.800">
          {isEditing
            ? "Custom Duration"
            : durationSeconds
            ? durationString(durationSeconds)
            : "No Duration Set"}
        </Text>
        <Popover
          placement="bottom-start"
          isOpen={isEditing}
          onOpen={setIsEditing.on}
          onClose={setIsEditing.off}
        >
          <PopoverTrigger>
            <Button
              pt="4px"
              size="sm"
              textStyle="Body/ExtraSmall"
              fontSize="12px"
              lineHeight="8px"
              color="neutrals.500"
              variant="link"
            >
              Edit Duration
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              minW="256px"
              w="min-content"
              borderColor="neutrals.300"
            >
              <PopoverHeader fontWeight="normal" borderColor="neutrals.300">
                Edit Duration
              </PopoverHeader>
              <PopoverArrow
                sx={{
                  "--popper-arrow-shadow-color": "#E5E5E5",
                }}
              />
              <PopoverCloseButton />
              <PopoverBody py={4}>
                <Box>
                  <Box mt={1}>
                    <DurationInput
                      // {...rest}
                      onChange={setDurationSeconds}
                      value={durationSeconds}
                      hideUnusedElements={true}
                      max={group.accessRule.timeConstraints.maxDurationSeconds}
                      min={60}
                      defaultValue={group.overrideTiming?.durationSeconds}
                    >
                      <Weeks />
                      <Days />
                      <Hours />
                      <Minutes />
                      <Button
                        variant="brandSecondary"
                        flexDir="column"
                        fontSize="12px"
                        lineHeight="12px"
                        mr={2}
                        isActive={
                          durationSeconds ==
                          group.accessRule.timeConstraints.maxDurationSeconds
                        }
                        onClick={handleClickMax}
                        sx={{
                          w: "50%",
                          rounded: "md",
                          borderColor: "neutrals.300",
                          color: "neutrals.800",
                          p: 2,
                          _active: {
                            borderColor: "brandBlue.100",
                            color: "brandBlue.300",
                            bg: "white",
                          },
                        }}
                      >
                        <chakra.span
                          display="block"
                          w="100%"
                          letterSpacing="1.1px"
                        >
                          MAX
                        </chakra.span>
                        {durationString(
                          group.accessRule.timeConstraints.maxDurationSeconds
                        )}
                      </Button>
                    </DurationInput>
                  </Box>
                </Box>
                {/*    <Select
                  mt={8}
                  size="xs"
                  variant="brandSecondary"
                  onChange={(e) => setState(e.target.value)}
                >
                  {["default", "max", "custom"].map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </Select> */}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
      <ButtonGroup ml="auto" variant="brandSecondary" spacing={2}>
        <Button
          size="sm"
          isLoading={approveLoading}
          loadingText="Loading..."
          disabled={declineLoading}
          onClick={() => {
            setApproveLoading(true);
            userReviewRequest(group.requestId, group.id, {
              decision: "APPROVED",
            })
              .then((e) => {
                toast({
                  title: "Request Declined",
                  status: "success",
                  variant: "subtle",
                  duration: 2200,
                  isClosable: true,
                });
              })
              .catch((e) => {
                toast({
                  title: "Error Declining Request",
                  status: "error",
                  variant: "subtle",
                  duration: 2200,
                  isClosable: true,
                });
              })
              .finally(() => setApproveLoading(false));
          }}
        >
          Approve
        </Button>
        <Button
          size="sm"
          isLoading={declineLoading}
          disabled={approveLoading}
          loadingText="Loading..."
          onClick={() => {
            setDeclineLoading(true);
            userReviewRequest(group.requestId, group.id, {
              decision: "DECLINED",
            })
              .then((e) => {
                toast({
                  title: "Request Approved",
                  status: "success",
                  variant: "subtle",
                  duration: 2200,
                  isClosable: true,
                });
              })
              .catch((e) => {
                toast({
                  title: "Error Approving Request",
                  status: "error",
                  variant: "subtle",
                  duration: 2200,
                  isClosable: true,
                });
              })
              .finally(() => setDeclineLoading(false));
          }}
        >
          Reject
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
export default Home;
