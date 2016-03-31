Starting in Grafana 3.x the InfluxDB 0.8 data source is no longer included out of the box.

But it is easy to install this plugin!

## Documentation
[InfluxDB Plugin Documentation](http://docs.grafana.org/datasources/influxdb/)

## Alternative installation method - Clone into plugins directory
Either clone this repo into your grafana plugins directory (default /var/lib/grafana/plugins if your installing grafana with package).
Restart grafana-server and the plugin should be automatically detected and used.

```
git clone git@github.com:grafana/datasource-plugin-influxdb-08.git
sudo service grafana-server restart
```


## Clone into a directory of your choice

The edit your grafana.ini config file (Default location is at /etc/grafana/grafana.ini) and add this:

```ini
[plugin.influxdb08]
path = /home/your/clone/dir/datasource-plugin-influxdb-08
```

Note that if you clone it into the grafana plugins directory you do not need to add the above config option. That is only
if you want to place the plugin in a directory outside the standard plugins directory. Be aware that grafana-server
needs read access to the directory.
