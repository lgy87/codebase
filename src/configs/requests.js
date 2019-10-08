export const requests = {
    normal: {
        // 新增审批
        saveJson: {
            url: "/app/web/referendum/saveJson",
            methods: [
                "get",
            ],
        },
        // 搜索审批流程常用联系人
        recommend: {
            url: "/quan/web/search/recommend",
            methods: [
                "get",
            ],
        },
        // 搜索智能推荐联系人
        recommendFlowUsers: {
            url: "/quan/web/search/recommendFlowUsers",
            methods: [
                "get",
            ],
        },
        // 拉取审批评论
        listComments: {
            url: "/app/web/referendum/listcomment",
            methods: [
                "get",
            ],
        },
        // 新增审批评论
        addComment: {
            url: "/app/web/referendum/addComment",
            methods: [
                "get",
            ],
        },
        // 查询自定义报销名称列表
        getReimburseList: {
            url: "/app/web/referendum/getReimburseList",
            methods: [
                "get",
            ],
        },
        // 新增工作报告
        addReport: {
            url: "/app/web/workReport/add",
            methods: [
                "get",
            ],
        },
        // 更新工作报告
        updateReport: {
            url: "/app/web/workReport/update",
            methods: [
                "get",
            ],
        },
        // 删除工作报告
        delReport: {
            url: "/app/web/workReport/delete",
            methods: [
                "get",
            ],
        },
        // 查看报告详情
        getReportInof: {
            url: "/app/web/workReport/info",
            methods: [
                "get",
            ],
        },
        // 获取某人提交的报告列表
        getUserReport: {
            url: "/app/web/workReport/getUserReport",
            methods: [
                "get",
            ],
        },
        // 获取他人提交给我的报告列表
        getSendToMe: {
            url: "/app/web/workReport/getSendToMe",
            methods: [
                "get",
            ],
        },
        // 获取他人知会给我的报告列表
        getCallToMe: {
            url: "/app/web/workReport/getCallToMe",
            methods: [
                "get",
            ],
        },
        // 获取他人提交给我的报告数量
        getTotalBySendToMe: {
            url: "/app/web/workReport/getTotalBySendToMe",
            methods: [
                "get",
            ],
        },
        // 获取某用户日报、周报、月报的统计数据
        getTotalOfMyReport: {
            url: "/app/web/workReport/getTotalOfMyReport",
            methods: [
                "get",
            ],
        },
        // 导入用户在某段时间的外勤签到记录
        importOutSignByTimeSpan: {
            url: "/app/web/workReport/importOutSignByTimeSpan",
            methods: [
                "get",
            ],
        },
        // 导入用户在某段时间内工作报告中的明日计划，支持日报、周报、月报的分类查询
        importNextContent: {
            url: "/app/web/workReport/importNextContent",
            methods: [
                "get",
            ],
        },
        // 导入用户在某段时间内已完成或未完成的任务
        importWork: {
            url: "/app/web/workReport/importWork",
            methods: [
                "get",
            ],
        },
        // 导入用户在某段时间内工作报告中的内容，支持日报、周报、月报的分类查询
        importCurContent: {
            url: "/app/web/workReport/importCurContent",
            methods: [
                "get",
            ],
        },
        // 获取一定时间段的外勤签到和已完成任务数量统计
        getWorkAndSignCount: {
            url: "/app/web/workReport/getWorkAndSignCount",
            methods: [
                "get",
            ],
        },
        // 添加报告评论
        addComment: {
            url: "/app/web/workReport/addComment",
            methods: [
                "get",
            ],
        },
        // 获取报告的评论列表
        getCommentList: {
            url: "/app/web/workReport/getCommentList",
            methods: [
                "get",
            ],
        },
        // 按员工在某年的签到统计
        employees4Month: {
            url: "/app/web/signstat/employees4Month",
            methods: [
                "get",
            ],
        },
        // 按员工在某时间段内的签到统计
        employees4Week: {
            url: "/app/web/signstat/employees4Week",
            methods: [
                "get",
            ],
        },
        // 按员工在某年的签到统计导出Excel
        employees4MonthExport: {
            url: "/app/web/signstat/employees4MonthExport",
            methods: [
                "get",
            ],
        },
        // 按员工在某时间段内的签到统计导出Excel
        employees4WeekExport: {
            url: "/app/web/signstat/employees4WeekExport",
            methods: [
                "get",
            ],
        },
        // 按客户（地址备注）在某时间段内的签到统计
        addr4Week: {
            url: "/app/web/signstat/addr4Week",
            methods: [
                "get",
            ],
        },
        // 按客户（地址备注）在某年的签到统计
        addr4Month: {
            url: "/app/web/signstat/addr4Month",
            methods: [
                "get",
            ],
        },
        // 按客户在某年的签到统计导出Excel
        addr4MonthExport: {
            url: "/app/web/signstat/addr4MonthExport",
            methods: [
                "get",
            ],
        },
        // 按客户在某时间段内的签到统计导出Excel
        addr4WeekExport: {
            url: "/app/web/signstat/addr4WeekExport",
            methods: [
                "get",
            ],
        },
        // 疑似代签
        getSign4Agent: {
            url: "/app/web/signstat/getSign4Agent",
            methods: [
                "get",
            ],
        },
        // 根据签到ID获取签到的用户信息
        getSignUsers: {
            url: "/app/web/signstat/getSignUsers",
            methods: [
                "get",
            ],
        },
        // 根据签到ID获取签到的地理信息
        getSignAddrmemos: {
            url: "/app/web/signstat/getSignAddrmemos",
            methods: [
                "get",
            ],
        },
        // 部门调取
        getDepartmentNoToken: {
            url: "/quan/web/notebook/getDepartmentTreeWithOutToken",
            methods: [
                "get",
            ],
        },
        // 获取用户权限是否是管理员
        getUserRight: {
            url: "/app/web/signstat/getUserRight",
            methods: [
                "get",
            ],
        },
        // 获取某人内勤签到统计数据
        getSingleInner: {
            url: "/app/web/signstat/getSingleInner",
            methods: [
                "get",
            ],
        },
        // 内勤 - 获取他人或全员内勤签到统计汇总摘要数据
        getMultInnerSum: {
            url: "/app/web/signstat/getMultInnerSum",
            methods: [
                "get",
            ],
        },
        // 内勤 - 管理员获取全员内勤签到统计明细数据
        getMultInnerDetail: {
            url: "/app/web/signstat/getMultInnerDetail",
            methods: [
                "get",
            ],
        },
        // 内勤 - 导出他人或全员内勤签到统计数据(包含汇总与明细) TODO
        exportMultInner: {
            url: "/app/web/signstat/exportMultInner",
            methods: [
                "get",
            ],
        },
        // ======搜索相关=================================
        // 顶部导航的索搜
        topBarSearch: {
            url: "/quan/web/search/contactlist",
            methods: [
                "get",
            ],
        },
        // ======消息相关=================================
        // 获取未读通知的个数
        getUnreadNoticeNum: {
            url: "/notify/web/get/wholeCatesUnReadNum",
            methods: [
                "get",
            ],
        },
        // 获取用户的全部的会话的消息
        getAllTypeWithLastMsg: {
            url: "/notify/web/get/wholeSessionsWithLastMsg",
            methods: [
                "get",
            ],
        },
        // 获得某一类型的消息的历史
        getNotifiesById: {
            url: "/notify/web/get/notifies",
            methods: [
                "get",
            ],
        },
        // =======圈子相关================================
        getTeamList: {
            url: "/relation/web/getTeamsByUser",
            methods: [
                "get",
            ],
        },
        // 全部圈子请求帖子列表
        getuserfeeds: {
            url: "/quan/web/topic/getuserfeeds",
            methods: [
                "get",
            ],
        },
        // 获取帖子详情
        getTopic: {
            url: "/quan/web/topic/info",
            methods: [
                "get",
            ],
        },
        // 获取圈子信息
        getTeamInfo: {
            url: "/quan/web/team/info",
            methods: [
                "get",
            ],
        },
        // 根据id获取用户信息（头像悬浮）
        getUserInfoOther: {
            url: "/account/web/user/getUserInfoOther",
            methods: [
                "get",
            ],
        },
        // 喜欢某个帖子 post
        like: {
            url: "/favorite/web/like",
            methods: [
                "get",
            ],
        },
        // 不喜欢某个帖子 post
        unlike: {
            url: "/favorite/web/unlike",
            methods: [
                "get",
            ],
        },
        // 收藏某个帖子 post
        collect: {
            url: "/quan/web/topic/collect",
            methods: [
                "get",
            ],
        },
        // 不收藏某个帖子 post
        uncollect: {
            url: "/quan/web/topic/uncollect",
            methods: [
                "get",
            ],
        },
        // 得到某个帖子的评论列表
        commentlist: {
            url: "/comment/web/list",
            methods: [
                "get",
            ],
        },
        // 得到某个帖子赞的列表
        getRecentLikeUsers: {
            url: "/favorite/web/getRecentLikeUsers",
            methods: [
                "get",
            ],
        },
        // 得到某个帖子的全部内容(点击展开)
        getfullcontent: {
            url: "/quan/web/topic/getfullcontent",
            methods: [
                "get",
            ],
        },
        // @用户查找
        getAtUser: {
            url: "/account/web/user/getAtUser",
            methods: [
                "get",
            ],
        },
        // 增加评论 post
        addComment: {
            url: "/comment/web/add",
            methods: [
                "get",
            ],
        },
        // 删除自己的评论
        rmComment: {
            url: "/comment/web/rm",
            methods: [
                "get",
            ],
        },
        // 查看评论过的人
        getUnitList: {
            url: "/favorite/web/getUnitList",
            methods: [
                "get",
            ],
        },
        // 查看评论数目
        num: {
            url: "/comment/web/num",
            methods: [
                "get",
            ],
        },
        // 圈子置顶或者取消置顶
        teamSetTop: {
            url: "/relation/web/updateTeamMember",
            methods: [
                "get",
            ],
        },
        // 同意通过邀请的 加入圈子
        acceptJoinTeamInvite: {
            url: "/quan/web/member/acceptInvite",
            methods: [
                "get",
            ],
        },
        // 同意通过申请的 加入圈子
        acceptJoinTeamApply: {
            url: "/quan/web/member/acceptApply",
            methods: [
                "get",
            ],
        },
        // 拒绝邀请加入圈子
        refuseJoinTeamInvite: {
            url: "/quan/web/member/refuseInvite",
            methods: [
                "get",
            ],
        },
        // 拒绝申请加入圈子
        refuseJoinTeamApply: {
            url: "/quan/web/member/refuseApply",
            methods: [
                "get",
            ],
        },
        // 登出
        logout: {
            url: "/account/web/user/logout",
            methods: [
                "get",
            ],
        },
        // 获取个人信息
        getUserDetail: {
            url: "/account/web/user/getUserInfo",
            methods: [
                "get",
            ],
        },
        // =======企业相关================================
        // 检查用户是否是管理员和发布者
        getDeployer: {
            url: "/app/web/notice/isDeployer",
            methods: [
                "get",
            ],
        },
        // 验证邀请码
        joinByWechatInviteCode: {
            url: "/account/web/joinByWechatInviteCode",
            methods: [
                "get",
            ],
        },
        // =======工作模块================================
        // ==公告==
        // 获取公告列表
        getNoticeList: {
            url: "/app/web/notice/getNoticeList",
            methods: [
                "get",
            ],
        },
        // ==请示==
        // 首页获取请示
        getIndexAsk: {
            url: "/app/web/referendum/getReferendums",
            methods: [
                "get",
            ],
        },
        // ==任务==
        // 首页获取任务
        getIndexWorks: {
            url: "/app/web/sendWork/getWorks",
            methods: [
                "get",
            ],
        },
        // ==签到==
        // 月签到排行榜
        getCheckinMonthRankings: {
            url: "/app/web/signstat/signMonthRanking",
            methods: [
                "get",
            ],
        },
        // 周签到排行榜
        getCheckinWeekRankings: {
            url: "/app/web/signstat/signWeekRanking",
            methods: [
                "get",
            ],
        },
        // ==通讯录==
        // 首页获取新加入的同事
        getNewColleagues: {
            url: "/quan/web/notebook/getColleagues",
            methods: [
                "get",
            ],
        },
        // 根据token获取authCode
        getAuthCode: {
            url: "/app/web/getCspAuthCode",
            methods: [
                "get",
            ],
        },
        // 同意加入企业
        acceptJoinOrgInite: {
            url: "/quan/web/notebook/acceptInvite",
            methods: [
                "get",
            ],
        },
        // 拒绝加入企业
        refuseJoinOrgInvite: {
            url: "/quan/web/notebook/refuseInvite",
            methods: [
                "get",
            ],
        },
        // 同意加入企业申请
        acceptJoinOrgApply: {
            url: "/quan/web/notebook/acceptApply",
            methods: [
                "get",
            ],
        },
        // 拒绝加入企业申请
        refuseJoinOrgApply: {
            url: "/quan/web/notebook/refuseApply",
            methods: [
                "get",
            ],
        },
        // 通过文件名下载
        downloadWithFilename: {
            url: "/quan/web/upload/downloadWithFilename",
            methods: [
                "get",
            ],
        },
        // 获打印审批报销单明细为pdf格式
        printingReimburse: {
            url: "/app/web/referendum/printingReimburse",
            methods: [
                "get",
            ],
        },
        // 获取用户信息
        getUsersInfoByUid: {
            url: "/account/web/user/getUserInfoOthers",
            methods: [
                "get",
            ],
        },
        /*新通讯录部分接口*/
        // 获取部门树
        getDepartmentTreeAndEmployeeNum: {
            url: "/quan/web/notebook/getDepartmentTreeAndEmployeeNum",
            methods: [
                "get",
            ],
        },
        // 批量新增企业员工
        addEmployeeBatch: {
            url: "/quan/web/notebook/addEmployeeBatch",
            methods: [
                "get",
            ],
        },
        // 企业通讯录导入接口
        importUserFromExcel: {
            url: "/quan/web/upload/importUserFromExcel",
            methods: [
                "get",
            ],
        },
        // 查看未加入部门列表
        getNotInDeptInfo: {
            url: "/quan/web/notebook/getNotInDeptInfo",
            methods: [
                "get",
            ],
        },
        // 获取未加入企业，未加入部门的员工人数
        getOrgCountInfo: {
            url: "/quan/web/notebook/getOrgCountInfo",
            methods: [
                "get",
            ],
        },
        // 修改部门顺序
        updateDeptIndex: {
            url: "/quan/web/notebook/updateDeptsIndex",
            methods: [
                "get",
            ],
        },
        // 上传企业logo
        avatar: {
            url: "/quan/web/upload/avatar",
            methods: [
                "get",
            ],
        },
        // 裁剪企业LOGO图片
        cutAvatar: {
            url: "/quan/web/common/cutAvatar",
            methods: [
                "get",
            ],
        },
        // 查询是否是首次登陆，用来显示引导
        showUpdateTips: {
            url: "/account/web/showUpdateTips",
            methods: [
                "get",
            ],
        },
        // 新版获取员工列表
        findEmployeeInfoOrderByManager: {
            url: "/quan/web/notebook/findEmployeeInfoOrderByManager",
            methods: [
                "get",
            ],
        },
        /*263*/
        // 开通
        openMail: {
            url: "/mail/web/openMail",
            methods: [
                "get",
            ],
        },
        // 新获取企业列表
        findUserOrgsNum: {
            url: "/quan/web/team/findUserOrgsNum",
            methods: [
                "get",
            ],
        },
        // 管理员开通当前企业的工作邮箱
        createMail: {
            url: "/mail/web/createMail",
            methods: [
                "get",
            ],
        },
        // 激活
        activityByCard: {
            url: "/mail/web/activityByCard",
            methods: [
                "get",
            ],
        },
        // 查询产品
        queryByCard: {
            url: "/mail/web/queryByCard",
            methods: [
                "get",
            ],
        },
        // 是否显示文件柜
        isGrayOrgForTongBuPan: {
            url: "/app/web/icon/isGrayOrgForTongBuPan",
            methods: [
                "get",
            ],
        },
        // 鉴权接口
        getAuthorityAppList: {
            url: "/app/web/icon/getAuthorityAppList",
            methods: [
                "get",
            ],
        },
    },
    csp: {
        // =======部门相关====================================
        // 新增部门
        addDepartment: {
            url: domain + "/api/v1/dept/addDepartment",
            methods: [
                "get",
            ],
        },
        // 删除部门
        delDepartment: {
            url: domain + "/api/v1/dept/delDepartment",
            methods: [
                "get",
            ],
        },
        // 修改部门
        updateDepartment: {
            url: domain + "/api/v1/dept/updateDepartment",
            methods: [
                "get",
            ],
        },
        // 查询部门
        selectDepartment: {
            url: domain + "/api/v1/dept/getDepartmentTree",
            methods: [
                "get",
            ],
        },
        // 根据orgid获取部门，不需要token
        getDepartmentNoToken: {
            url: "/quan/web/notebook/getDepartmentTreeWithOutToken",
            methods: [
                "get",
            ],
        },
        // 设置部门排序
        updateDeptIndex: {
            url: gzqDomain + "/quan/web/notebook/updateDeptsIndex",
            methods: [
                "get",
            ],
        },
        // =======员工相关====================================
        // 新增员工
        addEmployee: {
            url: domain + "/api/v1/employee/addEmployee",
            methods: [
                "get",
            ],
        },
        // 编辑员工
        updateEmployee: {
            url: domain + "/api/v1/employee/updateEmployee",
            methods: [
                "get",
            ],
        },
        updateEmployee: {
            url: "/quan/web/notebook/updateEmployee",
            methods: [
                "get",
            ],
        },
        // 删除员工
        delOneEmployee: {
            url: "/quan/web/notebook/delEmployee",
            methods: [
                "get",
            ],
        },
        // 批量删除
        delEmployees: {
            url: "/quan/web/notebook/delEmployees",
            methods: [
                "get",
            ],
        },
        // 通过员工id查询员工信息
        selectEmployeeByEmpId: {
            url: domain + "/api/v1/employee/getEmployee",
            methods: [
                "get",
            ],
        },
        // 通过excel导入员工
        importEmployeeByExcel: {
            url: gzqDomain + "/quan/web/upload/importUserFromExcel",
            methods: [
                "get",
            ],
        },
        // 查询上一次导入状态
        checkImportStatus: {
            url: "/quan/web/upload/checkOrgImportStatus",
            methods: [
                "get",
            ],
        },
        // 搜索员工
        selectEmployeesByKey: {
            url: domain + "/api/v1/employee/findEmployeeInfoByOrgIdAndKey",
            methods: [
                "get",
            ],
        },
        // 根据部门id搜索员工
        selectEmployeesByDeptId: {
            url: domain + "/api/v1/employee/findEmployeeAndDepartmentInfoByOrgIdOrDeptId",
            methods: [
                "get",
            ],
        },
        // 检查员工是否是企业管理员
        checkUserIsOrgManager: {
            url: cspDomain + "/api/v1/user/checkUserIsOrgManager",
            methods: [
                "get",
            ],
        },
        // 邀请用户加入企业
        inviteOneUser: {
            url: "/quan/web/notebook/invite",
            methods: [
                "get",
            ],
        },
        // 邀请用户加入企业
        inviteUsers: {
            url: "/quan/web/notebook/inviteBatch",
            methods: [
                "get",
            ],
        },
        // 批量修改员工部门
        updateEmployeesDepart: {
            url: "/quan/web/notebook/updateEmployeesDept",
            methods: [
                "get",
            ],
        },
        // 设置企业管理员
        setOrgAdmin: {
            url: cspDomain + "/api/v1/org/orgManager",
            methods: [
                "get",
            ],
        },
        // 取消企业管理员
        cancelOrgAdmin: {
            url: cspDomain + "/api/v1/org/cancelOrgManager",
            methods: [
                "get",
            ],
        },
        // ========企业相关=====================================
        // 获取企业信息
        getOrganization: {
            url: cspDomain + "/api/v1/organization",
            methods: [
                "get",
            ],
        },
        // 获取企业列表
        getOrgList: {
            url: cspDomain + "/api/v1/user",
            methods: [
                "get",
            ],
        },
        // 更新token通过orgId
        updateTokenByOrgId: {
            url: domain + "/api/v1/saveOrUpdateTokenOrgRel",
            methods: [
                "get",
            ],
        },
        setOrgInfo: {
            url: "/quan/web/notebook/updateEnterpriseAndOrganizationName",
            methods: [
                "get",
            ],
        },
        // 保存企业信息
        updateOrgInfo: {
            url: domain + "/special_api/v1/updateOrganizationWithToken",
            methods: [
                "get",
            ],
        },
        uploadOrgLogo: {
            url: domain + "/api/v1/org/upload/orgLogo",
            methods: [
                "get",
            ],
        },
        // 获取企业人数
        getOrgUserCount: {
            url: cspDomain + "/special_api/v1/organization/countUser",
            methods: [
                "get",
            ],
        },
        getEnterPriseStatus: {
            url: domain + "/api/v1/enterpriseStatus/get",
            methods: [
                "get",
            ],
        },
        setEnterPriseStatus: {
            url: domain + "/api/v1/enterpriseStatus/set",
            methods: [
                "get",
            ],
        },
    },
}

export default requests
