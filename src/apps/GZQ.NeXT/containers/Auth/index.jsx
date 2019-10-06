/*
 * Guangyao Li
 * 2017/3/11
 * 759646703@qq.com
 */
import { Checkbox } from "@blueprintjs/core"
import md5 from "blueimp-md5"
import i18nConfig from "configs/i18n"
import config from "./i18n"
import Image from "components/Image"
import { captchaUrl } from "configs/network"
import Input, { withIcon, formField } from "components/Input"
import styled from "styled-components"
import bg from "./images/bg.jpg"
const Auth = auth()

const i18n = i18nConfig(config)
const largeFormField = formField({ large: true })

const UserInputWithIcon = withIcon({ name: "person" })(Input)
const UserField = largeFormField(UserInputWithIcon)

const PasswordInputWithIcon = withIcon({ name: "lock" })(Input)
const PasswordField = largeFormField(PasswordInputWithIcon)

const CaptchaInputWithIcon = withIcon({ name: "media" })(Input)
const CaptchaAndImage = props => [
  <CaptchaInputWithIcon
    key="captcha"
    tabIndex="-1"
    name="captchaCode"
    placeholder={i18n("placeholder.captchaCode")}
    value={props.captchaCode}
    onChange={props.handleChange}
  />,
  <Image
    key="image"
    src={`${captchaUrl}${props.uuid}&r=${props.randomNum}`}
    className="pt-button pt-icon-arrow-right"
    onDoubleClick={props.refreshCaptchaImage}
    style={{ height: "38px", margin: "1px" }}
  />,
]
function Captcha(props) {
  if (!props.uuid) {
    return null
  }

  return (
    <div className="pt-input-group pt-large">
      <CaptchaAndImage {...props} />
    </div>
  )
}

Captcha.propTypes = {
  uuid: propTypes.string,
  randomNum: propTypes.number,
}

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = this.init()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      captchaCode: "",
    })
  }
  init = () => ({
    username: "",
    password: "",
    captchaCode: "",
  })
  reset = () => {
    this.setState(this.init())
  }
  handleChange = e => {
    const { target } = e

    this.setState({
      [target.name]: target.value,
    })
  }
  login = () => {
    let { username, password } = this.state
    console.log(this.state)
    const account = username.trim()
    password = password.trim()

    if (account.length === 0 || password.length === 0) {
      return
    }
    password = md5(password)
    const authInfo = {
      account,
      password,
    }

    if (this.state.captchaCode) {
      authInfo.imageNo = this.state.captchaCode
      authInfo.uuid = this.props.uuid
    }

    this.props.login(authInfo)
  }

  render() {
    return (
      <Auth>
        <div className="pt-control-group pt-vertical" style={{ width: 320 }}>
          <UserField
            tabIndex="0"
            name="username"
            placeholder={i18n("placeholder.username")}
            value={this.state.username}
            onChange={this.handleChange}
          />
          <PasswordField
            type="password"
            tabIndex="1"
            name="password"
            placeholder={i18n("placeholder.password")}
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Captcha
            handleChange={this.handleChange}
            captchaCode={this.state.captchaCode}
            uuid={this.props.uuid}
            randomNum={this.props.randomNum}
          />
          <div className="pt-button-group pt-fill">
            <button
              tabIndex="-1"
              className="pt-button pt-large pt-fixed"
              onClick={this.reset}
            >
              {i18n("text.reset")}
            </button>
            <button
              tabIndex="2"
              className="pt-button pt-large pt-intent-success"
              onClick={this.login}
            >
              {i18n("text.login")}
            </button>
          </div>
        </div>
      </Auth>
    )
  }
}

function auth() {
  return styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${bg});
    background-size: cover;
    background-position: center;
  `
}
