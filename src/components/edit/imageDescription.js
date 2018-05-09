// const node = {
//   native: false,
//   nodeName: 'ImageDescription',
//   props: {
// column: 3,
//   },
//   children: [
//     {
//       native: true, nodeName: 'div', children:
//         [
//           { native: false, nodeName: 'ImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//           {
//             native: false,
//             nodeName: 'VerticalLayout',
//             props: {
//               backgroundInfo: {
//                 background: 'white',
//                 backgroundType: 'pureColor',
//                 imageInfo: {},
//                 fillType: null,
//                 enableParallex: null
//               }
//             }
//           },
//         ]
//     },
//     {
//       native: true, nodeName: 'div', children:
//         [
//           { native: false, nodeName: 'ImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//           {
//             native: false,
//             nodeName: 'VerticalLayout',
//             props: {
//               backgroundInfo: {
//                 background: 'white',
//                 backgroundType: 'pureColor',
//                 imageInfo: {},
//                 fillType: null,
//                 enableParallex: null
//               }
//             }
//           },
//         ]
//     },
//   ]
// }

// {"native":false,"nodeName":"ImageDescription","props":{"column":3},"children":[{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6"}},{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}}}]},{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6"}},{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}}}]}]}
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import EditableImageArea from '../../components/edit/imageArea'
import EditableTextArea from '../../components/edit/textArea'
import EditableVerticalLayout from '../../components/edit/verticalLayout'
import backgroundSetting from '../../jssSettings/backgroundSetting'
// //   xs: integer 0px~600px 屏幕占比 xs/12
// //   sm: integer 600px 屏幕占比  sm/12
// //   md: integer 960px 屏幕占比 md/12
// //   lg: integer 1280px 屏幕占比 lg/12
// //   xl: integer 1920px 屏幕占比 xl/12

const children = [
  { props: {}, src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" }
]

const horizontalGridStyle = {

}
const verticalCenterStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}



export default class EditableImageDescription extends React.Component {
  constructor(props, context) {
    super(props)

    const { children, column } = this.props
    const childrenArray = React.Children.toArray(children)
    const childrenCounts = childrenArray.length

    this.state = {
      childrenCounts: childrenCounts,
      column: column,
      flex: 12 / this.props.column,
      imageHeightInfo: {},
    }

    // 取出子元素中的图片放入数组
    const imageAreas = childrenArray.map(x => x.props.children[0])

    // IACS is short for 'ImageAreaContainerStyle'
    // 设置默认的 minHeight
    for (let i = 0; i < childrenCounts; i++) {
      const imageArea = imageAreas[i]
      this.state[`${imageArea.props.selfkey}IACS`] = { minHeight: 0 }
    }
    // 行数 = 总数/列 的商 + 余数(大于 0 则是 1)
    const rows = Math.floor(childrenCounts / column) + ((childrenCounts % column) > 0 ? 1 : 0)

    let rowInfo = {} // { 1: {'Key': {height: 50}, 'key2': {},..}  }
    for (let i = 0; i < rows; i++) {
      // rowInfo[i + 1] = []
      imageAreas.slice(i * column, ((i + 1) * column)).forEach(x => {
        this.state[`${x.props.selfkey}Row`] = i + 1
        // 记录每行包含的的元素 key

        rowInfo[i + 1] = rowInfo[i + 1]  || {}

        rowInfo[i + 1][x.props.selfkey] = {}
      });
    }

    this.state.rowInfo = rowInfo

    console.log(`this.state 为: `)
    console.log(this.state)
  }

  getChildContext() {
    return { store: this.context.store };
  }

  // 回调自身所占高度
  reportHeight = (height, selfKey) => {
    // rowInfo { 1: {'key1': {height: 50}, 'key2': {},..}  }
    const selfRow = this.state[`${selfKey}Row`]
   
    let rowInfo = this.state.rowInfo
    rowInfo[selfRow][selfKey]['height'] = height

    // console.log(`rowInfo is :`)
    // console.log(rowInfo)
    
    this.setState({
      rowInfo: rowInfo
    })
 
    let minHeight = 0
    const thisRow = rowInfo[selfRow]

    for(let a in thisRow){
      if(thisRow[a].height > minHeight){
        minHeight = thisRow[a].height
      }
    } 

    let updateInfo = {}
    Object.keys(thisRow).forEach(x => {
      updateInfo[`${x}IACS`] = { minHeight: minHeight }
    })
   
    // console.log(`updateInfo is :`)
    // console.log(updateInfo)
    this.setState(updateInfo)

    console.log(height, selfKey)
  }

  render() {
    const { id } = this.props
    // const backgroundStyle = Object.assign({ position: 'relative' }, backgroundSetting.getBackgroundStyle(backgroundInfo))

    return (
      <div style={{ background: 'white', marginTop: 20 }}>
        {/* <div style={backgroundStyle} id={id}> */}
        <Grid name="水平" style={horizontalGridStyle}
          container direction={'row'}
          justify={'center'}>

          <Grid
            style={horizontalGridStyle}
            name={'chilrenContanier'}
            container
            justify={'center'}
            direction={'row'} >

            {this.props.children &&
              React.Children.toArray(this.props.children).map((child, index) => {
                return (
                  <Grid key={child.props.selfkey} item xs={12} sm={this.state.flex} md={this.state.flex} lg={this.state.flex} xl={this.state.flex}>
                    {/* {child} */}
                    <div name="girdContainer" style={{ padding: '5%' }}>
                      <div
                        name="imageAreaContanier"
                        style={Object.assign(
                          {},
                          this.state[`${child.props.children[0].props.selfkey}IACS`],
                          verticalCenterStyle)}
                      >
                        <EditableImageArea
                          hiddenDelete={true}
                          imageContainerStyle={{}}
                          noMeasure={false}
                          {...child.props.children[0].props}
                          reportHeight={this.reportHeight}
                        />
                      </div>
                      <EditableVerticalLayout
                        {...child.props.children[1].props}
                      />
                    </div>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
        {/* </div> */}
      </div>
    );
  }
}

EditableImageDescription.contextTypes = {
  store: PropTypes.object
};

EditableImageDescription.childContextTypes = {
  store: PropTypes.object
};
