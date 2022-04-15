Vec3 = function( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.add = function( v )
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

Vec3.prototype.sub = function( v )
{
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
}

Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

Vec3.prototype.min = function()
{
    //return Math.min( this.x, this.y, this.z );
    const m =  this.x < this.y ? this.x : this.y;
    return m < this.z ? m : this.z;
}

Vec3.prototype.max = function()
{
    //return Math.max( this.x, this.y, this.z );
    const m = this.x > this.y ? this.x : this.y;
    return m > this.z ? this.z : m;}

Vec3.prototype.mid = function()
{
    return this.sum() - this.min() - this.max();
}

Vec3.prototype.cross = function( v )
{
    var x = this.x, y = this.y, z = this.z;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
}

Vec3.prototype.length = function()
{
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
}

//task2
class Vec3
{
    //Constructor
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    min()
    {
        const m = this.x < this.y ? this.x : this.y;
        return m < this.z ? m : this.z;
    }

    max()
    {
        const m = this.x > this.y ? this.x : this.y;
        return m > this.z ? m : this.z;
    }

    sum()
    {
        return this.x + this.y + this.z;
    }


    mid()
    {
        return this.sum() - this.max() - this.min();
    }
}

//task3
Vec3.prototype.subVer = function(v1, v2)
{
    this.x = v1.x - v2.x;
    this.y = v1.y - v2.y;
    this.z = v1.z - v2.z;
    return this;
}
    