import axios from 'axios'
const baseURL = '/api'

const require = axios.create({
    baseURL,
})

require.interceptors.response.use(res => {
    return res.data;
})

const uPimgUrl = baseURL + '/uploadImg'

// 获取博客列表
const getBlogList = (params) => {
    return require({
        url: '/blog/list',
        method: 'post',
        data: params
    })
}

// 添加
const addBlog = params => {
    return require({
        url: '/blog/add',
        method: 'post',
        data: params,
    })
}

// 修改
const modifyBlog = params => {
    return require({
        url: '/blog/modify',
        method: 'post',
        data: params,
    })
}

// 删除博客
const deleteBlog = params => {
    return require({
        url: '/blog/delete',
        method: 'get',
        params,
    })
}

const changeLikeNum = params => {
    return require({
        url: '/blog/like',
        method: 'post',
        data: params,
    })
}

// 获取单条blog
const getSingleBlog = params => {
    return require({
        url: '/blog/detail',
        method: 'get',
        params
    })
}

const getWord = params => {
    return require({
        url: '/test',
        method: 'get',
        params
    })
}

const login = params => {
    return require({
        url: params.operation === 'login' ? '/user/login' : '/user/register',
        method: 'post',
        data: params,
    })
}

export {
    uPimgUrl,
    getBlogList,
    deleteBlog,
    changeLikeNum,
    addBlog,
    modifyBlog,
    getSingleBlog,
    getWord,
    login,
}
