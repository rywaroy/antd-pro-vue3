<template>
    <div class="user-layout">
        <div class="user-layout-container">
            <div class="user-layout-content">
                <div class="top">
                    <div class="header">
                        <a href="/">
                            <span class="title">Antd Pro Vue3</span>
                        </a>
                    </div>
                    <div class="desc">
                        Ant Design is the most influential web design specification in Xihu district
                    </div>
                </div>

                <router-view />

                <div class="footer">
                    <div class="links">
                        <a href="_self">帮助</a>
                        <a href="_self">隐私</a>
                        <a href="_self">条款</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.user-layout {
    height: 100vh;

    .user-layout-container {
        width: 100%;
        min-height: 100%;
        background: #f0f2f5 url(@/assets/images/background.svg) no-repeat 50%;
        background-size: 100%;
        position: relative;
    }
}

.user-layout-content {
    padding: 72px 0 24px;

    .top {
        text-align: center;

            .header {
                height: 44px;
                line-height: 44px;

                .badge {
                position: absolute;
                display: inline-block;
                line-height: 1;
                vertical-align: middle;
                margin-left: -12px;
                margin-top: -10px;
                opacity: 0.8;
                }

                .logo {
                height: 44px;
                vertical-align: top;
                margin-right: 16px;
                border-style: none;
                }

                .title {
                font-size: 33px;
                color: rgba(0, 0, 0, .85);
                font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
                font-weight: 600;
                position: relative;
                top: 2px;
                }
            }
            .desc {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
                margin-top: 12px;
                margin-bottom: 40px;
            }
        }

        .main {
            min-width: 260px;
            width: 368px;
            margin: 0 auto;
        }

        .footer {
            // position: absolute;
            width: 100%;
            bottom: 0;
            padding: 0 16px;
            margin: 48px 0 24px;
            text-align: center;

        .links {
            margin-bottom: 8px;
            font-size: 14px;
            a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
                &:not(:last-child) {
                    margin-right: 40px;
                }
            }
        }
        .copyright {
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
        }
    }
}
</style>
