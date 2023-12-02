import inquirer from 'inquirer'
import fs from 'node:fs/promises'
import path from 'node:path'

async function makeDirectory () {
    
    const projectFolderSrc = path.join('new-app', 'src')
    await fs.mkdir(projectFolderSrc, { recursive: true })
    await fs.mkdir(path.join('new-app', 'public'), { recursive: true })
    
    const folders = [ 'routers', 'services', 'controllers', 'middlewares', 'models', 'configs']
    
    folders.forEach(async folder => {
        await fs.mkdir(path.join(projectFolderSrc, folder), { recursive: true })
    })

    const questions = [
        {
            type: "list",
            name: "pattern",
            message: 'Do you want to use the Data Access Object (DAO) or Repository pattern?',
            choices: [
              "DAO",
              "Repository",
             ]
          }
    ]

    const responses = await inquirer.prompt(questions, function(responses) {
        return responses
    })

    console.log(responses)

    if (responses.pattern === 'DAO') {
        await fs.mkdir(path.join(projectFolderSrc, 'DAO'), { recursive: true })
    } else {
        await fs.mkdir(path.join(projectFolderSrc, 'repository'), { recursive: true })
    }

    await fs.writeFile(path.join(projectFolderSrc, 'routers', 'apiRouter.tsx'), '')
}

makeDirectory().catch(console.error);