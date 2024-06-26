export interface Role {
    id: number;
    organizationId: number;
    name: string;
    internalId: string;
    displayName: string;
    description: string;
    color: string | null;
    icon: string | null;
    order: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string;
    updatedBy: string | null;
    deletedBy: string | null;
    isDefault: boolean;
    isActive: boolean;
    isDeleted: boolean;
}

export interface RoleFormFields {
    name: string;
    displayName: string;
    description: string;
    color: string | null;
    icon: { file: File | null, url: string };
    active: boolean
    data: {
        name: string;
        displayName: string;
        description: string;
        color: string | null;
        active: boolean;
        icon: { file: File | null, url: string };
    }[]
}
