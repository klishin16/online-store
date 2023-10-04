import React from "react";

export interface IBreadcrumbRoute {
    path: string,
    breadcrumbName: string,
}

export interface IAdminViewProps {
    breadcrumbPath: IBreadcrumbRoute[]
}

export enum EAdminViews {
    SETTINGS = "/settings",
    USERS = "/users",
    STATISTICS = "/statistics",
    DEVICES = "/devices",
    CATEGORIES = "/categories",
    BRANDS = "/brands",
    OTHER = "/other"
}

export interface ISidebarItem {
    title: string;
    icon: React.ReactNode;
    view: EAdminViews;
}
