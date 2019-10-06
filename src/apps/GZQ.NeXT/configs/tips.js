import forEach from "lodash/forEach"
import template from "lodash/template"

const tips = {
    copier: {
        action: "复制",
    },
    audio: {
        action: "播放",
    },
}

const types = [
    {
        type: "success",
        text: "${action}成功",
    },
    {
        type: "failure",
        text: "${action}失败",
    },
    {
        type: "notSupport",
        text: "对不起, 您的浏览器不支持${action}功能!",
    },
]

const templates = types.reduce((templates, item) => {
    templates[item.type] = template(item.text)
    return templates
}, {})

forEach(tips, (value, key) => {
    if (value.action) {
        forEach(templates, (fn, type) => {
            value[type] = fn(value)
        })
    }
})

export {tips}
export default tips
