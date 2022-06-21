module.exports={
    extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
    overrides:[
        {
            files: ['**/*.less'],
            customSyntax: 'postcss-less',
        }
    ]
}