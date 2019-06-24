# Toast

Toast is a meal planning app. Each directory in `services` is a relevant service.

## Setting up a developer environment

I haven't automated this yet, but there are some commands you can run in `gcloud` to spin up a database remotely so you don't have to worry about managing that.

Create firewall rules for bolt and web interface:

```
$ gcloud compute firewall-rules create neo4j-standalone --allow tcp:7473,tcp:7687,tcp:7474 --source-ranges 0.0.0.0/0 --target-tags neo4j --project $GCLOUD_PROJECT_ID
```

Create a VM to run the database:

```
$ gcloud compute instances create neo4j-standalone --project $GCLOUD_PROJECT_ID --image neo4j-enterprise-1-3-5-5-apoc --tags neo4j --machine-type g1-small --boot-disk-size 10GB --boot-disk-type pd-ssd --image-project launcher-public
```

Then you want to reserve a static IP address in Google Cloud. I'm sure there's a way to do that via command line, but I do it in the UI because I'm a casual.

Once you have the IP, visit `<YOUR_IP>:7474` in a web browser. Default creds are `neo4j/neo4j`, and it will ask you to change the password. Store that password.

Then migrate the database:

```
$ cd services/toast-core
$ npm run migration:up -- --url=bolt://<YOUR_VM_IP_ADDRESS>:7687 -p=<YOUR_NEO4J_PASSWORD>
```

Now you're up and running with a developer database instance. Set `NEO4J_BOLT_HOST` environment variable to `bolt://<YOUR_IP>` and you're ready to run any of the services locally... until you need other dependencies besides the database, that is. I'll document those when I have a better idea of how to set them up (or I probably won't, but if anyone besides me reads this, just ask me).
