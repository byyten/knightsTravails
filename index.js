
board = () => {
    let cols = 'abcdefgh'
    let rows = [1, 2, 3, 4, 5, 6, 7, 8]
    let recurse = 6 // longest 'shortest' possible move to find a specific grid e.g. 0,0 -> 7,7    
    node = (data = null, prev = null) => {
        if (data == -1) return -1 
        next = []
        path = []
        return { data, prev, next, path }
    }
    canMove = (p) => {
        add = (p, m) => {
            // p == node.data  // m = [x, y]
            pm0 = p[0] + m[0]
            pm1 = p[1] + m[1]
            if (pm0 < 0 || pm0 > 7 || pm1 < 0 || pm1 > 7) {
                return
            }
            return [pm0, pm1]
        }
        return [
            add(p.data, [1, 2]),
            add(p.data, [-1, 2]),
            add(p.data, [1, -2]),
            add(p.data, [-1, -2]),
            add(p.data, [2, 1]),
            add(p.data, [2, -1]),
            add(p.data, [-2, 1]),
            add(p.data, [-2, -1])
        ].filter(_p => _p !== undefined)
    }
    rc = (coord) => {
        return cols[coord[0]] + rows[coord[1]]
    }  
    rc_coord = (rc_ref) => {
        c = cols.indexOf(rc_ref[0])
        r = Number(rc_ref[1]) - 1
        return [c, r]
    }
    moves = (_grid) => {
        _nextMoves = canMove(_grid)
        _nextMoves.forEach(move => { // move = [x,y]
            _move = node(move, rc(_grid.data))
            _move.path = [ ..._grid.path, rc(move)]
            move_rc = rc(_move.data) 
            // if haven't traversed already & not target & not tooo deep - longest shortest move is diagonal across whole board ~6-7
            if ( !_grid.path.includes(move_rc) && move_rc !== target_rc && _grid.path.length < recurse) { // _move.path.length < 6 && !reachedTarget(nodes, target_rc)) { //
                // console.log('recurse ' + move_rc)
                _grid.next.push(_move)
                chess.moves(_move)
            } else if (move_rc === target_rc) { // got target or recursion too deep
                // console.log('target ', _move.path)
                paths.push(_move.path)            
            }
        })
        return _grid
    } 
    boardMoves = (start, target) => {
        if (!start || !target) return 
        // possible paths
        
        paths = [] 
        // start point
        start_rc = rc(start)
        // end point
        target_rc = rc(target)
        if (start_rc === target_rc) {
            // console.log(`\n   zero moves from ${start_rc} to ${target_rc}`)
            return [ start_rc]
        } else {
            console.log(`\n  find path/s from  ${start_rc} to ${target_rc}    [${start}] -> [${target}] `)        
        }
        
        _grid = node(start)
        _grid.path.push(rc(start))
    
        // determine next possible moves
        moves = canMove(_grid)
        moves.forEach(next => {
            _move = node(next, rc(_grid.data))
            move_rc = rc(next)
            _move.path = [ ..._grid.path, move_rc]
            if (move_rc === target_rc) {
                // paths.sort((a,b) => a.length - b.length)
                // return paths[0]        
                // return _move.path
                paths.push(_move.path)
                paths.sort((a,b) => a.length - b.length)
                lenShortest = paths[0].length
                shortest = paths.filter(path => path.length === lenShortest)        
                return shortest
            }
            _grid.next.push(_move)
        })
        
        // recurse through the 'next' move possibilities
        _grid.next.forEach(_grid => {
            chess.moves(_grid)
        })
    
        // possible solutions - find 1st or nth shortest since there may be several
        paths.sort((a,b) => a.length - b.length)
        lenShortest = paths[0].length
        shortest = paths.filter(path => path.length === lenShortest)
    
        return shortest
    }
    return { node, rc, rc_coord, canMove, moves, boardMoves } // 
}

knightMoves = (start, target) => {
    chess = board()
    shortest = chess.boardMoves(start, target)
    console.log(`   Several (${shortest.length}) shortest paths exist`)
    console.log(`\n   You made it in ${shortest[0].length - 1} moves!  Here's your paths:`)
    shortest.forEach(path => {
        coords = []
        path.forEach(grid => {
            coords.push(chess.rc_coord(grid))
        })
        console.log(`     ${JSON.stringify(coords)} `)        
    })    
    console.log(` `)
}

/* 
    paths = knightMoves([3,4], [3, 2]);
    
    knightMoves([0,0],[1,2])
    knightMoves([4,2],[0,0])
    knightMoves([7,1],[1,0])
    knightMoves([5,3],[5,0])
    knightMoves([5,7],[2,0])

    // knightMoves([3,3],[4,3])
    //   => You made it in 3 moves!  Here's your path:
    //     [3,3]
    //     [4,5]
    //     [2,4]
    //     [4,3]
    knightMoves([3,3],[4,3])

 */


