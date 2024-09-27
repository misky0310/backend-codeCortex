export const createUserValidationSchema = {
    username:{
        isLength:{
            options:{
                min:5,
                max:32
            },
            errorMessage:'Username must be 5-32 characters long'
        },
        notEmpty:{
            errorMessage:'Username must not be empty',
        },
        isString:{
            errorMessage:'Username must be a string'
        },

    },
    email:{
        isLength:{
            options:{
                min:5,
                max:32
            },
            errorMessage:'Email must be 5-32 characters long'
        },
        notEmpty:{
            errorMessage:'Email must not be empty',
        },
        isString:{
            errorMessage:'Email must be a string'
        },
    },
    password:{
        notEmpty:{
            errorMessage:'Password must be provided'
        }
    }
}