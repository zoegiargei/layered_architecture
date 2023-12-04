import inquirer from 'inquirer'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

// const folder = process.argv[2] ?? '.'
const folder = process.env.FOLDER ?? '.'

async function makeDirectory (folder) {
    
    const mainFolder = path.join(`${folder}`, 'new-app')
    const projectFolderSrc = path.join(mainFolder, 'src')
    await fs.mkdir(projectFolderSrc, { recursive: true })
    await fs.mkdir(path.join(mainFolder, 'public'), { recursive: true })
    
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

    if (responses.pattern === 'DAO') {
        await fs.mkdir(path.join(projectFolderSrc, 'DAO'), { recursive: true })
    } else {
        await fs.mkdir(path.join(projectFolderSrc, 'repository'), { recursive: true })
    }

    await fs.writeFile(path.join(projectFolderSrc, 'routers', 'apiRouter.tsx'), '')
}

makeDirectory(folder).catch(console.error);