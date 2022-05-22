const db = require('@metamathstudios/redis-wrapper');

class Controller {
  async status(req, res) {
    const { key } = req.params;

    try {
      if(key) {
        const data = await db.getValue(key);
        res.status(200).json({ status: data.status });
      } else {
        res.status(400).json({ message: 'Invalid key' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }

  async from(req, res) {
    const { key } = req.params;

    try {
      if(key) {
        const data = await db.getValue(key);
        res.status(200).json({ from: data.from });
      } else {
        res.status(400).json({ message: 'Invalid key' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }

  async to(req, res) {
    const { key } = req.params;

    try {
      if(key) {
        const data = await db.getValue(key);
        res.status(200).json({ to: data.to });
      } else {
        res.status(400).json({ message: 'Invalid key' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }

  async amount(req, res) {
    const { key } = req.params;

    try {
      if(key) {
        const data = await db.getValue(key);
        res.status(200).json({ amount: data.amount });
      } else {
        res.status(400).json({ message: 'Invalid key' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }

  async origin(req, res) {
    const { key } = req.params;

    try {
      if(key) {
        const data = await db.getValue(key);
        res.status(200).json({ origin: data.origin });
      } else {
        res.status(400).json({ message: 'Invalid key' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }

  async target(req, res) {
    const { key } = req.params;

    try {
      if(key) {
        const data = await db.getValue(key);
        res.status(200).json({ target: data.target });
      } else {
        res.status(400).json({ message: 'Invalid key' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }

  async account(req, res) {
    const { account } = req.params;

    try {
      if(account) {
        const data = await db.getAccountTxs(account);
        res.status(200).json({ txs: data });
      } else {
        res.status(400).json({ message: 'Invalid key' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }
}

module.exports = new Controller();