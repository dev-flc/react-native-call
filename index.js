import { Platform, Linking } from 'react-native'

const isStringNumber = ( str ) => Object.prototype.toString.call( str ) === '[object String]'
const isBool = ( bool ) => Object.prototype.toString.call( bool ) === '[object Boolean]'
const isStringUrl = ( url ) => typeof url  === 'string'; 

const makeACall = ( number ) => {

    return Linking.canOpenURL( number ).then( canOpen => {
        if (!canOpen) {
          return Promise.reject( new Error(`el dato: ${number} es invalido`))
        } else {
          return Linking.openURL( number ).catch( ( err ) => Promise.reject( err ) )
        }
  })
    
}

const openBrowser = ( url ) =>{

    return Linking.canOpenURL( url ).then( canOpen  => {
        if (!canOpen) {
          return Promise.reject( new Error(`la: ${url} es invalida`))
        } else {
          return Linking.openURL( url ).catch( ( err ) => Promise.reject( err ) )
        }
    });
}

export const CALL = ( callData ) => {

    const settings = Object.assign({
        prompt: true
    }, callData)

    if ( !settings.number ) { 
        return Promise.reject( 
            new Error( 'Please provide a number to call' )
        )
    }
    if ( !isStringNumber( settings.number ) || !isBool( settings.prompt ) ) { 
        return Promise.reject(
            new Error( 'The arguments provided are not a valid type')
        ) 
    }

  const callNumber = `${Platform.OS === 'ios' && settings.prompt ? 'telprompt:' : 'tel:'}${settings.number}`

  return makeACall( callNumber )
}

export const WEB = ( url ) => {

    if ( !url ) { 
        return Promise.reject( 
            new Error( 'Please provide a URL to redirect' )
        )
    }

    if ( !isStringUrl( url ) ) { 
        return Promise.reject(
            new Error( 'The arguments provided are not a valid type')
        ) 
    }

    return openBrowser( url )
}
