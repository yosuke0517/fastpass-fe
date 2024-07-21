export default {
    "./**/**/src/**/*.{js,jsx,ts,tsx}": files => {
        const commands = []
        const lintTargetFiles = files.join(' ')

        commands.push(`eslint ${lintTargetFiles}`)
        commands.push(`prettier --check ${lintTargetFiles}`)
        commands.push(`cspell -c ../../cspell.json ${lintTargetFiles}`)

        return commands
    },
}
