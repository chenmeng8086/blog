<template>
    <div class="layout">
        <Layout>
            <Header>
                <span class="layout-logo">
                    <svg t="1609073066702" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="24674" width="32" height="32">
                        <path
                            d="M906.666667 270.933333l-140.8-138.666666c-12.8-12.8-32-21.333333-51.2-21.333334s-38.4 8.533333-49.066667 21.333334l-140.8 140.8C503.466667 298.666667 490.666667 330.666667 490.666667 362.666667c0 21.333333 4.266667 130.133333 10.666666 142.933333 4.266667 6.4 10.666667 14.933333 19.2 19.2 12.8 6.4 125.866667 14.933333 149.333334 17.066667h6.4c32-2.133333 64-19.2 66.133333-21.333334 6.4-4.266667 12.8-8.533333 17.066667-12.8l140.8-140.8c12.8-12.8 21.333333-29.866667 21.333333-49.066666 2.133333-17.066667-4.266667-34.133333-14.933333-46.933334z m-46.933334 57.6l-115.2 115.2c-6.4 6.4-17.066667 6.4-21.333333 0l-134.4-132.266666c-2.133333-2.133333-4.266667-6.4-4.266667-10.666667s2.133333-8.533333 4.266667-10.666667l117.333333-117.333333c2.133333-2.133333 4.266667-4.266667 8.533334-4.266667 2.133333 0 6.4 2.133333 8.533333 4.266667l138.666667 140.8c2.133333 4.266667 2.133333 10.666667-2.133334 14.933333z m-179.2 157.866667h-4.266666l-74.666667-6.4c0-12.8-6.4-25.6-12.8-32-8.533333-8.533333-21.333333-14.933333-36.266667-17.066667l-4.266666-72.533333v-2.133333l132.266666 130.133333zM341.333333 196.266667H185.6c-46.933333 0-85.333333 38.4-85.333333 85.333333v155.733333c0 46.933333 38.4 85.333333 85.333333 85.333334H341.333333c46.933333 0 85.333333-38.4 85.333334-85.333334v-155.733333c0-46.933333-38.4-85.333333-85.333334-85.333333z m0 262.4H185.6c-12.8 0-21.333333-8.533333-21.333333-21.333334v-155.733333c0-12.8 8.533333-21.333333 21.333333-21.333333H341.333333c12.8 0 21.333333 8.533333 21.333334 21.333333v155.733333c0 12.8-10.666667 21.333333-21.333334 21.333334zM401.066667 614.4c-14.933333-17.066667-38.4-25.6-59.733334-25.6H185.6c-46.933333 0-85.333333 38.4-85.333333 85.333333v155.733334c0 46.933333 38.4 85.333333 85.333333 85.333333H341.333333c46.933333 0 83.2-36.266667 83.2-85.333333v-155.733334c0-23.466667-8.533333-44.8-23.466666-59.733333z m-59.733334 234.666667H185.6c-12.8 0-21.333333-8.533333-21.333333-21.333334v-155.733333c0-12.8 8.533333-21.333333 21.333333-21.333333H341.333333c12.8 0 21.333333 10.666667 21.333334 21.333333v155.733333c0 12.8-8.533333 21.333333-21.333334 21.333334zM729.6 586.666667h-155.733333c-23.466667 0-44.8 8.533333-59.733334 25.6-14.933333 14.933333-23.466667 36.266667-21.333333 59.733333v155.733333c0 44.8 36.266667 81.066667 83.2 85.333334h155.733333c46.933333 0 85.333333-38.4 85.333334-85.333334v-155.733333c-2.133333-44.8-42.666667-85.333333-87.466667-85.333333z m21.333333 85.333333v155.733333c0 12.8-10.666667 21.333333-21.333333 21.333334H576c-12.8 0-21.333333-8.533333-21.333333-21.333334v-155.733333c0-12.8 8.533333-21.333333 21.333333-21.333333h155.733333c12.8 0 19.2 8.533333 19.2 21.333333z"
                            fill="#347DFF" p-id="24675"></path>
                    </svg>
                    <span>个人博客</span>
                </span>
                <Input class="search-input" :value="common.searchKey" @on-change="changeSeachKey" search
                    placeholder="请输入相关搜索内容" @on-search="searchBlog"></Input>
                <span>
                    <Avatar icon="ios-person" />
                    <Dropdown @on-click="onDropdown">
                        <span style="color: #fff; margin-left: 12px;">
                            {{ common.userInfo.chineseName }}
                            <Icon type="ios-arrow-down"></Icon>
                        </span>
                        <template #list>
                            <DropdownMenu>
                                <DropdownItem name="quit">退出</DropdownItem>
                            </DropdownMenu>
                        </template>
                    </Dropdown>
                </span>
            </Header>
            <Layout style="height: calc(100vh - 64px)">
                <Layout :style="{ padding: '0 24px 12px 24px' }">
                    <slot name="top-bar"></slot>
                    <slot name="breadcrumb"></slot>
                    <Content class="content" :style="{ padding: '24px', minHeight: '280px', background: '#fff' }">
                        <Sping v-if="sping"></Sping>
                        <div v-if="noData" class="none-default">
                            <Icon size="80" type="md-sad" />
                            暂无数据~
                        </div>
                        <slot></slot>
                    </Content>
                    <slot name="bottom-bar"></slot>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import Sping from '@/common-components/sping'
import { mapState, mapActions } from 'vuex'
export default {
    components: { Sping },
    props: {
        isHaveData: undefined,
        sping: false,
        search: {
            type: Function,
        }
    },

    computed: {
        ...mapState({
            common: store => store.common
        }),
        noData() {
            return this.isHaveData == undefined ? false : !this.isHaveData
        }
    },

    methods: {
        ...mapActions('common', [
            'changeSearchkey',
            'changeAcitveName',
            'changeSearchType'
        ]),

        selectItem(e, query) {
            this.changeAcitveName(e)
            e = e.toLocaleLowerCase()
            if (e === '首页') {
                this.$router.push({
                    path: '/home',
                    query: query
                })
            } else if (e === 'other') {
                this.$router.push({
                    path: '/other',
                    query: query
                })
            }
            const searchKey = this.common.searchKey
            if (e !== '首页') this.search(searchKey)
        },

        changeSeachKey(e) {
            this.changeSearchkey(e.target.value)
        },

        searchBlog(e) {
            let options = ['frontend', 'backend', 'other']
            let flag = options.includes(this.$route.name)
            if (!flag) {
                this.changeSearchType('all')
            }

            if (this.common.searchType === 'all') {
                this.selectItem('other', { searchAll: true })
            } else {
                this.selectItem(this.$route.name, {})
            }
        },
        onDropdown(e) {
            if (e === 'quit') {
                this.$router.push('/login')
                sessionStorage.removeItem('userInfo')
            }
        }
    }
}
</script>

<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}

.ivu-layout {
    height: 100%;
}

.ivu-layout-header {
    display: flex;
    align-items: center;
}

.layout-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    width: 140px;
    padding: 0 10px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    color: #d7dde4;
    font-size: 15px;
}

.search-input {
    margin: 0 auto;
    width: 400px;
}

.layout-nav {
    display: inline-block;
    width: 450px;
    margin: 0 auto;
    margin-right: 20px;
}

.content {
    overflow-y: auto;
    position: relative;
}

.none-default {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ivu-input-group-prepend {
    width: 120px;
}
</style>
