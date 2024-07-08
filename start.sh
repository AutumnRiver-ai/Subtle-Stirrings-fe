# cd dist
# pm2 start http-server --name fe_server -- -p 8019 

# http-server -p 8019 

cd /home/lighthouse/Subtle-Stirrings-fe
sudo mv  ./dist /usr/share/nginx
cd /usr/share/nginx
sudo rm -rf html
sudo mv dist html
sudo systemctl restart nginx