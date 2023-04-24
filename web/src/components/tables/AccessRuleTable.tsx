import { ChevronDownIcon, EditIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearch } from "react-location";
import { Column } from "react-table";
import { useAdminListAccessRules } from "../../utils/backend-client/admin/admin";
import { AccessRule } from "../../utils/backend-client/types";
import { durationString } from "../../utils/durationString";
import { usePaginatorApi } from "../../utils/usePaginatorApi";
import { CFAvatar } from "../CFAvatar";
import RuleConfigModal from "../modals/RuleConfigModal";
import { TableRenderer } from "./TableRenderer";

export const AccessRuleTable = () => {
  const navigate = useNavigate();

  const paginator = usePaginatorApi<typeof useAdminListAccessRules>({
    swrHook: useAdminListAccessRules,
    hookProps: {},
  });

  const [selectedAccessRule, setSelectedAccessRule] = useState<AccessRule>();

  const cols = useMemo<Column<AccessRule>[]>(
    () => [
      {
        accessor: "name",
        Header: "Name",
        Cell: ({ cell }) => {
          return (
            <Text textStyle="Body/Small" color="neutrals.700" as="a">
              {cell.value}
            </Text>
          );
        },
      },
      {
        accessor: "description",
        Header: "Description",

        Cell: ({ cell }) => {
          return (
            // Truncates the text if it is long, full description is in the tooltip
            <Tooltip label={cell.value} aria-label="description">
              <Text
                textStyle="Body/Small"
                color="neutrals.700"
                noOfLines={1}
                maxWidth="200px"
              >
                {cell.value}
              </Text>
            </Tooltip>
          );
        },
      },
      {
        accessor: "targets",
        Header: "Details",
        Cell: ({ cell }) => {
          return (
            <HStack>
              {/* <ProviderIcon shortType={cell.value.provider.type} /> */}

              <Text
                color="neutrals.700"
                textStyle="Body/Small"
                whiteSpace={"nowrap"}
              >
                {durationString(
                  cell.row.original.timeConstraints.maxDurationSeconds
                )}
              </Text>
            </HStack>
          );
        },
      },
      {
        accessor: "metadata",
        Header: "Created By",
        Cell: ({ cell }) => {
          return (
            <HStack>
              <CFAvatar
                tooltip
                userId={cell.value?.createdBy}
                size="xs"
                variant="withBorder"
                textProps={{
                  textStyle: "Body/Small",
                  maxW: "20ch",
                  noOfLines: 1,
                  color: "neutrals.700",
                }}
              />
            </HStack>
          );
        },
      },
      {
        // @ts-ignore this is required because ts cannot infer the nexted object types correctly
        accessor: "metadata.createdAt",
        Header: "Date created",
        // @ts-ignore
        Cell: ({ cell }) => (
          <Text textStyle="Body/Small" color="neutrals.700">
            {" "}
            {format(new Date(Date.parse(cell.value)), "p dd/MM/yy")}
          </Text>
        ),
      },
      {
        // @ts-ignore this is required because ts cannot infer the nexted object types correctly
        accessor: "metadata.updatedAt",
        Header: "Last updated",
        // @ts-ignore
        Cell: ({ cell }) => (
          <Text textStyle="Body/Small" color="neutrals.700">
            {format(new Date(Date.parse(cell.value)), "p dd/MM/yy")}
          </Text>
        ),
      },
      {
        accessor: "id",
        Header: "",
        id: "actions",
        Cell: ({ cell }) => {
          return (
            <Menu>
              <MenuList>
                <Link to={"/admin/access-rules/" + cell.value}>
                  <MenuItem as="a">
                    <MenuIcon mr={2} color="neutrals.500">
                      <EditIcon />
                    </MenuIcon>
                    Edit Rule
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Flex justify="space-between" my={5}>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<SmallAddIcon />}
          as={Link}
          to="/admin/access-rules/create"
          id="new-access-rule-button"
          data-testid="create-access-rule-button"
        >
          New Access Rule
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            size="sm"
          >
            {status === "ACTIVE"
              ? "Active"
              : status === "ARCHIVED"
              ? "Archived"
              : "All"}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              defaultValue="active"
              title="View option"
              type="radio"
              onChange={(e) => {
                switch (e) {
                  case "active":
                    navigate({
                      search: (old) => ({
                        ...old,
                        status: "active",
                      }),
                    });
                    break;
                  case "archived":
                    navigate({
                      search: (old) => ({
                        ...old,
                        status: "archived",
                      }),
                    });
                    break;
                  default:
                    navigate({
                      search: (old) => ({
                        ...old,
                        status: undefined,
                      }),
                    });
                }
              }}
            >
              <MenuItemOption value="active">Active</MenuItemOption>
              <MenuItemOption value="archived">Archived</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>

      {TableRenderer<AccessRule>({
        columns: cols,
        data: paginator?.data?.accessRules,
        emptyText: "No access rules",
        linkTo: true,
        apiPaginator: paginator,
      })}

      <RuleConfigModal
        isOpen={selectedAccessRule !== undefined}
        onClose={() => setSelectedAccessRule(undefined)}
        rule={selectedAccessRule}
      />
    </>
  );
};
