export const components = {
	schemas: {
		LoginUser: {
			type: 'object',
			properties: {
				email: {
					type: 'string',
					description: 'User email',
				},
				password: {
					type: 'string',
					description: 'User password',
				},
			},
			required: ['email', 'password'],
		},
		RegisterUser: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: 'User name',
					minLength: 3,
				},
				email: {
					type: 'string',
					description: 'User email',
					format: 'email',
				},
				password: {
					type: 'string',
					description: 'User password',
					minLength: 6,
					maxLength: 20,
				},
				avatar: {
					type: 'string',
					description: 'User avatar',
				},
			},
			required: ['name', 'email', 'password'],
		},
		ActivationUser: {
			type: 'object',
			properties: {
				activationCode: {
					type: 'integer',
					description: 'Activation code',
				},
				activationToken: {
					type: 'string',
					description: 'Activation token',
				},
			},
			required: ['activationCode', 'activationToken'],
		},
	},
}
