import * as ApplicationDataActionCreators from './applicationData'
import * as ApplicationActionCreators from './application'

export default {
    ...ApplicationDataActionCreators, 
    ...ApplicationActionCreators
}