import CustomAvatar from '@/components/custom-avatar';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, EditButton, DeleteButton, FilterDropdown, List, useTable } from '@refinedev/antd';
import { HttpError, useGo } from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import { Text } from '@/components/text';
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';
import { CompaniesListQuery } from '@/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';

export const CompanyList = ({ children }: React.PropsWithChildren) => {
    const go = useGo();
    const { tableProps, filters } = useTable<
        GetFieldsFromList<CompaniesListQuery>,
        HttpError,
        GetFieldsFromList<CompaniesListQuery>
    >({
        resource: 'companies',
        onSearch: (values) => [
            {
                field: 'name',
                operator: 'contains',
                value: values.name,
            },
        ],
        pagination: {
            pageSize: 12,
        },
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc',
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: 'name',
                    operator: 'contains',
                    value: undefined,
                },
            ],
        },
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY,
        },
    });

    return (
        <div>
            <List
                breadcrumb={false}
                headerButtons={() => (
                    <CreateButton
                        onClick={() =>
                            go({
                                to: {
                                    resource: 'companies',
                                    action: 'create',
                                },
                                options: {
                                    keepQuery: true
                                },
                                type: 'replace',
                            })
                        }
                    />
                )}
            >
                <Table {...tableProps}>
                    <Table.Column<Company>
                        key="name"
                        dataIndex="name"
                        title="Company Title"
                        filterIcon={<SearchOutlined />}
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Input placeholder="Search Company" />
                            </FilterDropdown>
                        )}
                        render={(value, record) => (
                            <Space>
                                <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                                <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
                            </Space>
                        )}
                    />

                    <Table.Column<Company>
                        key="totalRevenue"
                        dataIndex="totalRevenue"
                        title="Open deals amount"
                        render={(value, company) => (
                            <Text>
                                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
                            </Text>
                        )}
                    />
                    <Table.Column<Company>
                        key="actions"
                        dataIndex="id"
                        title="Actions"
                        fixed="right"
                        render={(value) => (
                            <Space>
                                <EditButton hideText size="small" recordItemId={value} />
                                <DeleteButton hideText size="small" recordItemId={value} />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            {children}
        </div>
    );
};

export default CompanyList;
