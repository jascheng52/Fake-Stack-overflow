
export default function IfHyperLink (qText) {
  let valid = true
  console.log(qText + ' qText is ')
  const charArr = qText.split('')
  if (charArr.includes('[') && charArr.includes(']') && charArr.includes('(') && charArr.includes(')')) {
    let index = qText.indexOf('[')
    console.log(index + ' POGUUUU')
    index = index + 1
    if (/^[a-zA-Z]*$/.test(qText.charAt(index))) {
      if (charArr.includes(']')) {
        const endBracIndex = qText.indexOf(']')
        const paren = endBracIndex + 1
        if (qText.charAt(paren) === '(') {
          console.log('Hello')
          const temp = paren + 1
          const https = qText.substring(temp, temp + 8)
          const http = qText.substring(temp, temp + 7)
          console.log(http + ' ')
          if (!(https === 'https://' || http === 'http://')) {
            valid = false
          }
        } else {
          valid = false
        }
      } else {
        valid = false
      }
    }
  } else {
    valid = false
  }
  return valid
}
