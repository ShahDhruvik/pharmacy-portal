// ALl your constants and enums. This includes pre-defined functions and other commonly used variables. ex: date-format functions, other standarad maintaining function
export const x = 10

export const BlogPosts: Record<string, { title: string, description: string }> = {
    'first-blog-post': {
        title: 'First Blog Post',
        description: 'Lorem ipsum dolor sit amet, consectetur adip.'
    },
    'second-blog-post': {
        title: 'Second Blog Post',
        description: 'Hello React Router v6'
    }
};

export const enum ROLES {
    ADMIN = "ADMIN",
    USER = "USER"
}

export const enum CACHE_KEYS {
    POST = "post",
    USER = "user",
    TODO1 = 'todo1'
}
