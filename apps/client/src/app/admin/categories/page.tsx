'use client'
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import type { DataNode } from 'antd/es/tree';
import { Button, Card, Row, Tree } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import { AppColors } from "@/constants";
import { usePathname } from "next/navigation";
import { useAppDispatch, useRequest, useTypedSelector } from "@/hooks";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { IDrawerCloseParams } from "@/types";
import CategoriesCreationDrawer from "@/app/components/categories/categories-creation-drawer";
import { CategoriesService } from "@/services/categories.service";
import { ICategory } from "@/models";


const CategoriesContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
`

interface ICategoryTreeNode extends ICategory {
    key: React.Key;
    title: string;
    children: ICategoryTreeNode[];
}

const createCategoriesTree = (dataset: ICategory[]): DataNode[] => {
    const treeNodesMap = new Map<number, ICategoryTreeNode>();
    dataset.forEach(category => treeNodesMap.set(category.id, {...category, key: category.id, title: category.name, children: []}));

    const dataTree: DataNode[] = [];
    dataset.forEach(category => {
        if(category.parentCategoryId) {
            treeNodesMap.get(category.parentCategoryId)?.children.push(treeNodesMap.get(category.id)!)
        } else {
            dataTree.push(treeNodesMap.get(category.id)!);
        }
    });
    return dataTree;
};


const AdminCategories = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { token } = useTypedSelector(state => state.auth);
    // TODO token!
    const [categories, loading, refreshCategories] = useRequest(() =>
        CategoriesService.fetchAll(token!)
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Categories loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );

                return []
            })
    )

    const [categoriesTree, setCategoriesTree] = useState<DataNode[] | null>(null);
    useEffect(() => {
        if (categories) {
            setCategoriesTree(createCategoriesTree(categories))
        }
    }, [categories])


    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const showDrawer = () => {
        setIsDrawerOpened(true);
    };

    const onDrawerClose = (params?: IDrawerCloseParams) => {
        setIsDrawerOpened(false);
        if (params?.refreshItems) {
            refreshCategories();
        }
    };

    // const treeLeaf = () => {
    //     return (
    //         <div>
    //             <Text>Category</Text>
    //             <Button type="primary" shape="circle" icon={<PlusOutlined />} />
    //         </div>
    //     )
    // }

    const treeData: DataNode[] = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'test',
                    key: '0-0-0',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                            disableCheckbox: true,
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [{ title: <span style={ { color: '#1677ff' } }>sss</span>, key: '0-0-1-0' }],
                },
            ],
        },
    ];


    return (
        <>
            <AppBreadcrumbs/>

            <CategoriesContainer>
                <Card size={ "small" } style={ { marginBottom: 8 } }>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshCategories() }
                        >Refresh</Button>
                        <Button onClick={ () => showDrawer() } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <Tree
                    defaultExpandAll
                    showLine
                    switcherIcon={ <DownOutlined/> }
                    treeData={ categoriesTree ?? [] }
                    blockNode
                />

                <CategoriesCreationDrawer open={ isDrawerOpened } onClose={ onDrawerClose } categories={ categories }/>
            </CategoriesContainer>
        </>
    )
}

export default AdminCategories;
