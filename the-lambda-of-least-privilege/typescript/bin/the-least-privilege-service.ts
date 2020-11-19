#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

// Helper Classes
import { RoleMapper } from "../util/role-mapper";

import { CognitoIdentityPoolStack } from '../lib/cognito-identity-pool-stack';
import { LeastPrivilegeWebserviceStack } from '../lib/least-privilege-webservice-stack';
import { CognitoRbacRoleMappingStack } from '../lib/cognito-rbac-rolemappings-stack';

import { StackConfiguration } from '../lib/configuration/stack-configuration';

const app = new cdk.App();

// ================================================================================
// Pre-requisites.
//
// Have created an Auth0 account and registered a client application by following x 
// instructions
// ================================================================================

// ================================================================================
// TODO What are the steps for having a local application up and running
//
// ================================================================================

// TODO Amplify Invocation library
// TODO Trigger Login
// TODO Use app-session created from login to call cognito-IDP
// TODO Invoke service for each user type
// TODO Handle errors

// ================================================================================
// Create a WebService implemented using ApiGateway and Lambda
// 
// Web API with a lambda writing into a gateway
// This stack should create a set of IAM roles that are required to invoke it.
// ================================================================================
const webServiceStack = new LeastPrivilegeWebserviceStack(app, 'swa-lp-ws')

// ================================================================================
// Create the Identity Pool Stack
// 
// Provide the details for your third party IDP (i.e. Auth0 or Ping)
// You will need to retrieve the client-id and secret from whatever vault solution that you use
//   !! Please dont commit client ids or secrets into your version control.
//
// =================================================================================

const cognitoIdPoolSaml = new CognitoIdentityPoolStack(app, 'swa-lp-cog', {
    configuration: {
        providerType: StackConfiguration.provider.configuration.saml.type,
        metadataURL: StackConfiguration.provider.configuration.saml.metadataURL,
        providerGroupsAttrName: StackConfiguration.provider.configuration.saml.claimsAttrRef,
        callbackUrls: StackConfiguration.provider.configuration.saml.callbackUrls,
        logoutUrls: StackConfiguration.provider.configuration.saml.logoutUrls
    },
    providerName: StackConfiguration.provider.name,
    //roleMappingRules: auth0RoleMapper.getRules(),
    cognitoDomainName: StackConfiguration.cognitoDomainName
});

// ================================================================================
// Map our Roles
// 
// This is the process where by we map SAML/OIDC Claims to the IAM roles that we have 
// defined.
// =================================================================================

const cognitoRbacRoleMappings = new CognitoRbacRoleMappingStack(app, 'swa-lp-roleMappings', {
    cognitoIdentityPoolStack: cognitoIdPoolSaml,
    webServiceStack: webServiceStack,
    mappingAttr: StackConfiguration.provider.configuration.saml.claimsAttrRef,
    providerName: StackConfiguration.provider.name
})

/*
// OIDC Cnofiguration
const cognitoIdPoolOidc = new CognitoIdentityPoolStack(app, 'swa-lp-cog', {
    configuration: {
        providerClientId: StackConfiguration.provider.configuration.oidc.clientId,
        providerGroupsAttrName: StackConfiguration.provider.configuration.oidc.claimsAttrRef,
        providerClientSecret: StackConfiguration.provider.configuration.oidc.clientSecret,
        providerIssuer: StackConfiguration.provider.configuration.oidc.issuerEnpoint,
        providerType: StackConfiguration.provider.configuration.oidc.type,
        callbackUrls: StackConfiguration.provider.configuration.oidc.callbackUrls,
        logoutUrls: StackConfiguration.provider.configuration.oidc.logoutUrls
    },
    providerName: StackConfiguration.provider.name,
    roleMappingRules: auth0RoleMapper.getRules(),
    cognitoDomainName: StackConfiguration.cognitoDomainName
});
*/
