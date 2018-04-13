/**
 * Created by livia on 2018/1/21.
 */
import regExpObj from "simpl-schema/dist/regExp";

const regExpMessages = [
  {exp: regExpObj.Email, msg: '必须是合法的电邮地址'},
  {exp: regExpObj.EmailWithTLD, msg: '必须是合法的电邮地址'},
  {exp: regExpObj.Domain, msg: '必须是合法的域名'},
  {exp: regExpObj.WeakDomain, msg: '必须是合法的域名'},
  {exp: regExpObj.IP, msg: '必须是一个合法的 IPv4 或 IPv6 地址'},
  {exp: regExpObj.IPv4, msg: '必须是一个合法的 IPv4地址'},
  {exp: regExpObj.IPv6, msg: '必须是一个合法的 IPv6 地址'},
  {exp: regExpObj.Url, msg: '必须是一个合法的 URL'},
  {exp: regExpObj.Id, msg: '必须是一个数字序号'},
  {exp: regExpObj.ZipCode, msg: '必须是一个邮编'},
  {exp: regExpObj.Phone, msg: '必须是一个电话号码'},
];

const cnMessages = {
  initialLanguage: 'cn',
  messages: {
    cn: {
      required: '必须填写{{{label}}}',
      minString: '{{{label}}}最短{{min}}字符长',
      maxString: "{{{label}}}不能超过{{max}}字符",
      minNumber: "{{{label}}}至少是{{min}}",
      maxNumber: "{{{label}}}不能超过{{max}}",
      minNumberExclusive: "{{{label}}}必须大于{{min}}",
      maxNumberExclusive: "{{{label}}}必须小于{{max}}",
      "minDate": "{{{label}}}必须在{{min}}时或之后",
      "maxDate": "{{{label}}}不能在{{max}}之后",
      "badDate": "{{{label}}}不是一个正确的日期",
      "minCount": "至少包含{{minCount}}项",
      "maxCount": "不能超过{{maxCount}}项",
      "noDecimal": "{{{label}}}必须是整数",
      "notAllowed": "{{{value}}}填写不正确",
      expectedType: '{{{label}}}必须是{{dataType}}类型',
      passwordMismatch: '密码两次输入的不一致',
      regEx({
              label,
              regExp,
            }) {
        // See if there's one where exp matches this expression
        let msgObj;
        if (regExp) {
          msgObj = _.find(regExpMessages, (o) => o.exp && o.exp.toString() === regExp);
        }

        const regExpMessage = msgObj ? msgObj.msg : '正则校验失败';

        return `${label} ${regExpMessage}`;
      },
      keyNotInSchema: '{{name}}不符合结构规则',
    },
  },
};

export default cnMessages;
