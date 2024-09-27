# Executing `ts` scripts locally

Install `ts-node` globally using

```shell
npm install -g typescript
npm install -g ts-node

# fast transpiler
npm i -g @swc/core
```

Execute a script using

```shell
ts-node <script>
```

If your getting an error like `ts-node.ps1 cannot be loaded because running scripts is disabled on this system`, try running this command on a an administrator PowerShell sesson

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

