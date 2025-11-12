import { Sandbox } from '@e2b/code-interpreter';
import { Temp_Sandbox } from '../utils/tempSandbox';

const sandboxService = async (projectId: string) => {
    const sandboxData = Temp_Sandbox.find((sandbox) => sandbox.projectId);
    if(sandboxData){
        return { host: sandboxData.host, sandbox: sandboxData.sandbox, sandboxAlive: true }
    }

    const sandbox = await Sandbox.create('ce50a2e02xkmkz0igbf3')
    const host = sandbox.getHost(5173);
    Temp_Sandbox.push({
        projectId,
        host,
        sandbox
    });
    return { host, sandbox, sandboxAlive: false }
}

export default sandboxService;