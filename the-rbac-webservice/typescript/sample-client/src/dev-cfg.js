export default {

/**
 * swa-lp-identity-pool-stack.CognitoDomainOutput = swa-hits
swa-lp-identity-pool-stack.ExportsOutputRefswalpidentitypoolstackIdentityPoolA8DF1BFE = us-east-1:2a4f97b2-e753-46fe-a7c0-71e86936ec3b
swa-lp-identity-pool-stack.ExportsOutputRefswalpidentitypoolstackUserPool98AE2C12D76FB24A = us-east-1_p8eoT3zY9
swa-lp-identity-pool-stack.ExportsOutputRefswalpidentitypoolstackUserPoolClientD1654143 = 7cv41gpmsvjl7ptasddv61jb6l
swa-lp-identity-pool-stack.IdentityPoolId = us-east-1:2a4f97b2-e753-46fe-a7c0-71e86936ec3b
swa-lp-identity-pool-stack.RegionOutput = us-east-1
swa-lp-identity-pool-stack.UserPoolIdOutput = us-east-1_p8eoT3zY9
swa-lp-identity-pool-stack.WebClientIdOutput = 7cv41gpmsvjl7ptasddv61jb6l
 */

    awsConfig: {
        Auth: {
            // Amazon Cognito Identity Pool ID
            identityPoolId: 'us-east-1:2a4f97b2-e753-46fe-a7c0-71e86936ec3b',
            // Amazon Cognito Region
            region: 'us-east-1',
            // Amazon Cognito User Pool ID
            userPoolId: 'us-east-1_p8eoT3zY9',
            // Amazon Cognito Web Client ID
            userPoolWebClientId: '7cv41gpmsvjl7ptasddv61jb6l',
            // Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: true,
            // oauth

            oauth: {
                domain: 'swa-hits.auth.us-east-1.amazoncognito.com', // {your-cognito-domain.auth.us-east-1.amazoncognito.com}
                scope: ['profile', 'openid', 'aws.cognito.signin.user.admin'],
                redirectSignIn: `${window.location.origin}/callback`,
                redirectSignOut:
                    `${window.location.origin}/logout`,
                responseType: 'code',
            },
        },
        Analytics: {
            disabled: true,
        },
        API: {
            endpoints: [
                {
                    name: 'blogApi',
                    endpoint: 'https://cfmzeuzmw6.execute-api.us-east-1.amazonaws.com/prod',
                    region: 'us-east-1',
                    /*custom_header: async () => ({
                        jwttoken: (await Auth.currentSession()).getIdToken().getJwtToken(),
                      })*/
                },
            ],
        },
    },
};